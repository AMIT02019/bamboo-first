import os
import json
import base64
import zipfile
import requests

def deploy():
    print("=== BAMBOO FIRST - DEPLOY PRODUCT IMAGES & SITE DATA ===")

    # 1. Create a zip archive of all product images in assets/products and catalogue PDF
    zip_filename = "product_images_bundle.zip"
    print(f"\n[1/4] Creating zip bundle of product images and catalogue PDF ({zip_filename})...")
    with zipfile.ZipFile(zip_filename, 'w', compression=zipfile.ZIP_DEFLATED) as z:
        for f in os.listdir('assets/products'):
            full_path = os.path.join('assets/products', f)
            if os.path.isfile(full_path):
                z.write(full_path, arcname=f)
        extra_assets = [
            'bamboo-first-product-catalogue.pdf',
            'bamboo-forest-hero.webp',
            'bamboo-forest-hero.jpg',
            'bamboo-kandil-hero.webp',
            'bamboo-kandil-hero.jpg'
        ]
        for extra in extra_assets:
            extra_path = os.path.join('assets', extra)
            if os.path.isfile(extra_path):
                z.write(extra_path, arcname=extra)
                print(f"  + Added assets/{extra} to bundle.")
    
    zip_size = os.path.getsize(zip_filename)
    print(f"  + Bundle size: {zip_size / 1024:.1f} KB ({zip_size} bytes)")

    with open(zip_filename, 'rb') as f:
        b64_zip = base64.b64encode(f.read()).decode('utf-8')

    # 2. Gather plugin code files
    print("\n[2/4] Gathering plugin code files...")
    files = {}
    base_plugin_dir = 'plugin_src/bamboo-first-builder'
    for root, _, filenames in os.walk(base_plugin_dir):
        for filename in filenames:
            full_path = os.path.join(root, filename)
            rel_path = os.path.relpath(full_path, base_plugin_dir).replace('\\', '/')
            # Only include text/code files in the files dict
            if rel_path.endswith(('.php', '.js', '.css', '.json')):
                with open(full_path, 'r', encoding='utf-8') as f:
                    files[rel_path] = f.read()
    print(f"  + Gathered {len(files)} code files.")

    # 3. Load pages data
    print("\n[3/4] Loading site-data.json...")
    with open('plugin_src/bamboo-first-builder/data/site-data.json', 'r', encoding='utf-8') as f:
        pages = json.load(f)
    print(f"  + Loaded {len(pages)} pages.")

    # Runner code base64
    with open('bamboo-runner-v8/bamboo-runner-v8.php', 'rb') as f:
        b64_runner = base64.b64encode(f.read()).decode('utf-8')

    # PHP code to extract the product images zip directly and clean element cache
    php_extract_snippet = f"""
    $img_dir = $plugin_dir . '/assets/products';
    if (!is_dir($img_dir)) {{
        wp_mkdir_p($img_dir);
    }}
    $zip_data = base64_decode('{b64_zip}');
    $tmp_zip = sys_get_temp_dir() . '/bamboo_img_' . time() . '.zip';
    file_put_contents($tmp_zip, $zip_data);

    $zip = new ZipArchive();
    if ($zip->open($tmp_zip) === TRUE) {{
        $zip->extractTo($img_dir);
        $count = $zip->numFiles;
        $zip->close();
        echo "  + Successfully extracted {{$count}} assets into {{$img_dir}}\\n";

        // Place extra assets in plugin assets and web root
        $extras = ['bamboo-first-product-catalogue.pdf', 'bamboo-forest-hero.webp', 'bamboo-forest-hero.jpg', 'bamboo-kandil-hero.webp', 'bamboo-kandil-hero.jpg'];
        foreach ($extras as $extra) {{
            $src = $img_dir . '/' . $extra;
            if (file_exists($src)) {{
                copy($src, $plugin_dir . '/assets/' . $extra);
                copy($src, ABSPATH . $extra);
                unlink($src);
                echo "  + Installed {{$extra}} to plugin assets and web root.\\n";
            }}
        }}
    }} else {{
        echo "  - Failed to open temporary zip file.\\n";
    }}
    @unlink($tmp_zip);

    // Update runner v8
    $runner_file = WP_PLUGIN_DIR . '/bamboo-runner-v8/bamboo-runner-v8.php';
    file_put_contents($runner_file, base64_decode('{b64_runner}'));
    echo "  + Updated bamboo-runner-v8.php on server.\\n";

    // Delete all _elementor_element_cache entries
    global $wpdb;
    $wpdb->query("DELETE FROM {{$wpdb->postmeta}} WHERE meta_key = '_elementor_element_cache'");
    echo "  + Deleted all _elementor_element_cache rows.\\n";
    """

    payload = {
        'files': files,
        'pages': pages,
        'exec_code': php_extract_snippet
    }

    json_str = json.dumps(payload)
    b64_payload = base64.b64encode(json_str.encode('utf-8')).decode('utf-8')
    print(f"\n[4/4] Sending deployment payload to WordPress ({len(b64_payload)} base64 bytes)...")

    url = 'https://wheat-panther-397584.hostingersite.com/'
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    r = requests.post(url, data={'execute_bamboo_v8': b64_payload}, headers=headers, timeout=120)

    print("\nServer response status:", r.status_code)
    print("\nServer deployment log:\n" + "="*50)
    print(r.text)
    print("="*50)

if __name__ == '__main__':
    deploy()
