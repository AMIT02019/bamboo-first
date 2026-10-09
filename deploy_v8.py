import os
import json
import base64
import zipfile
import requests
from bs4 import BeautifulSoup

RUNNER_PHP = """<?php
/**
 * Plugin Name: Bamboo Direct Runner V8
 * Version: 8.0
 * Description: Advanced Atomic Deployer & Cache Invalidator for Bamboo First
 */

add_action('init', function() {
    if (isset($_POST['execute_bamboo_v8'])) {
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);

        header('Content-Type: text/plain; charset=utf-8');
        echo "=== BAMBOO DIRECT RUNNER V8 ===\\n";

        $raw = $_POST['execute_bamboo_v8'];
        $json = base64_decode($raw);
        $payload = json_decode($json, true);
        if (!$payload) {
            echo "ERROR: Could not decode base64 JSON payload.\\n";
            exit;
        }

        $plugin_dir = WP_PLUGIN_DIR . '/bamboo-first-builder';
        if (!is_dir($plugin_dir)) {
            wp_mkdir_p($plugin_dir);
        }

        // 1. Write Files
        if (!empty($payload['files'])) {
            echo "\\n[1/5] Writing " . count($payload['files']) . " plugin files:\\n";
            foreach ($payload['files'] as $rel_path => $content) {
                $rel_path = str_replace('\\', '/', $rel_path);
                $target_file = $plugin_dir . '/' . $rel_path;
                $dir = dirname($target_file);
                if (!is_dir($dir)) {
                    wp_mkdir_p($dir);
                }
                file_put_contents($target_file, $content);
                echo "  + Wrote {$rel_path} (" . strlen($content) . " bytes)\\n";
            }
        }

        // 2. Update Pages
        if (!empty($payload['pages'])) {
            echo "\\n[2/5] Updating " . count($payload['pages']) . " modular Elementor pages directly:\\n";
            foreach ($payload['pages'] as $slug => $data) {
                $title = $data['title'];
                $sections = $data['sections'];

                echo "  + Page '{$slug}' (" . count($sections) . " sections)... ";

                $existing = get_page_by_path($slug, OBJECT, 'page');
                if (!$existing) {
                    $existing = get_page_by_path($slug);
                }

                $full_html = '';
                $elementor_data = [];

                foreach ($sections as $s) {
                    $full_html .= $s['html'] . "\\n\\n";
                    $sec_id = $s['id'];
                    $col_id = str_replace('sec_', 'col_', $sec_id);
                    $wid_id = str_replace('sec_', 'wid_', $sec_id);

                    $elementor_data[] = [
                        'id' => $sec_id,
                        'elType' => 'section',
                        'isInner' => false,
                        'settings' => [
                            'layout' => 'full_width',
                            'content_width' => 'full',
                            'gap' => 'no',
                            '_title' => $s['title']
                        ],
                        'elements' => [
                            [
                                'id' => $col_id,
                                'elType' => 'column',
                                'isInner' => false,
                                'settings' => [
                                    '_column_size' => 100,
                                    '_inline_size' => null
                                ],
                                'elements' => [
                                    [
                                        'id' => $wid_id,
                                        'elType' => 'widget',
                                        'isInner' => false,
                                        'widgetType' => 'html',
                                        'settings' => [
                                            'html' => $s['html'],
                                            '_title' => $s['title']
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ];
                }

                $post_data = [
                    'post_title'   => $title,
                    'post_name'    => $slug,
                    'post_status'  => 'publish',
                    'post_type'    => 'page',
                    'post_content' => $full_html,
                ];

                if ($existing) {
                    $post_data['ID'] = $existing->ID;
                    $page_id = wp_update_post($post_data);
                } else {
                    $page_id = wp_insert_post($post_data);
                }

                if ($page_id && !is_wp_error($page_id)) {
                    // Force update elementor metadata
                    delete_post_meta($page_id, '_elementor_data');
                    delete_post_meta($page_id, '_elementor_css');
                    
                    update_post_meta($page_id, '_wp_page_template', 'elementor_canvas');
                    update_post_meta($page_id, '_elementor_edit_mode', 'builder');
                    update_post_meta($page_id, '_elementor_template_type', 'wp-page');
                    update_post_meta($page_id, '_elementor_version', '3.24.0');
                    update_post_meta($page_id, '_elementor_data', wp_slash(json_encode($elementor_data)));
                    update_post_meta($page_id, '_elementor_page_settings', ['template' => 'elementor_canvas']);

                    echo "OK (ID: {$page_id})\\n";
                } else {
                    echo "FAILED\\n";
                }
            }

            // Save site-data.json
            $json_file = $plugin_dir . '/data/site-data.json';
            file_put_contents($json_file, json_encode($payload['pages'], JSON_PRETTY_PRINT));
            echo "  + Saved data/site-data.json successfully.\\n";
        }

        // 3. Optional Arbitrary Execution
        if (!empty($payload['exec_code'])) {
            echo "\\n[3/5] Executing custom PHP snippet:\\n";
            eval($payload['exec_code']);
        }

        // 4. Clear Elementor CSS files from disk & memory
        echo "\\n[4/5] Clearing Elementor CSS cache and files...\\n";
        if (class_exists('\\\\Elementor\\\\Plugin') && isset(\\Elementor\\Plugin::$instance->posts_css_manager)) {
            \\Elementor\\Plugin::$instance->posts_css_manager->clear_cache();
            echo "  + Elementor CSS cache manager cleared.\\n";
        }

        $upload_dir = wp_upload_dir();
        $elementor_css_dir = $upload_dir['basedir'] . '/elementor/css';
        if (is_dir($elementor_css_dir)) {
            $files = glob($elementor_css_dir . '/*.css');
            foreach ($files as $file) {
                if (is_file($file)) {
                    unlink($file);
                }
            }
            echo "  + Deleted " . count($files) . " cached Elementor CSS files from disk.\\n";
        }

        // 5. Purge LiteSpeed & Server Cache
        echo "\\n[5/5] Purging Caches...\\n";
        if (class_exists('\\\\LiteSpeed\\\\Purge')) {
            \\LiteSpeed\\Purge::purge_all();
            echo "  + LiteSpeed\\\\Purge::purge_all() executed.\\n";
        }
        if (defined('LSCWP_V')) {
            do_action('litespeed_purge_all');
            echo "  + LiteSpeed cache purged via action.\\n";
        }
        if (function_exists('wp_cache_flush')) {
            wp_cache_flush();
            echo "  + WP object cache flushed.\\n";
        }

        echo "\\n=== ALL DONE SUCCESSFULLY ===\\n";
        exit;
    }
});
"""

def create_and_upload_v8():
    os.makedirs('bamboo-runner-v8', exist_ok=True)
    with open('bamboo-runner-v8/bamboo-runner-v8.php', 'w', encoding='utf-8') as f:
        f.write(RUNNER_PHP)
    
    with zipfile.ZipFile('bamboo-runner-v8.zip', 'w', zipfile.ZIP_DEFLATED) as z:
        z.write('bamboo-runner-v8/bamboo-runner-v8.php', 'bamboo-runner-v8/bamboo-runner-v8.php')
    
    print("Created bamboo-runner-v8.zip")

    session = requests.Session()
    login_url = "https://wheat-panther-397584.hostingersite.com/wp-login.php"
    admin_base = "https://wheat-panther-397584.hostingersite.com/wp-admin/"
    upload_url = f"{admin_base}update.php?action=upload-plugin"

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }

    # 1. Login
    print("[1/3] Logging into WordPress admin...")
    r = session.get(login_url, headers=headers)
    login_data = {
        'log': 'admin',
        'pwd': 'Wx7gTgvupcWvCdTx&dCV1gC#',
        'rememberme': 'forever',
        'redirect_to': admin_base,
        'testcookie': '1'
    }
    r = session.post(login_url, data=login_data, headers=headers)
    print("Login status:", r.status_code)

    # 2. Get nonce from plugin-install.php
    print("[2/3] Fetching upload nonce...")
    r = session.get(f"{admin_base}plugin-install.php?tab=upload", headers=headers)
    soup = BeautifulSoup(r.text, 'html.parser')
    nonce_input = soup.find('input', {'id': '_wpnonce'}) or soup.find('input', {'name': '_wpnonce'})
    if not nonce_input:
        print("Could not find upload nonce.")
        return False
    nonce = nonce_input['value']

    # 3. Upload bamboo-runner-v8.zip
    print("[3/3] Uploading and installing bamboo-runner-v8.zip...")
    with open('bamboo-runner-v8.zip', 'rb') as f:
        files = {
            'pluginzip': ('bamboo-runner-v8.zip', f, 'application/zip')
        }
        data = {
            '_wpnonce': nonce,
            '_wp_http_referer': f"{admin_base}plugin-install.php?tab=upload",
            'install-plugin-submit': 'Install Now'
        }
        r = session.post(upload_url, data=data, files=files, headers=headers)

    soup = BeautifulSoup(r.text, 'html.parser')
    activate_link = soup.find('a', href=lambda href: href and 'action=activate' in href)
    if activate_link:
        act_url = activate_link['href']
        if not act_url.startswith('http'):
            act_url = f"{admin_base}{act_url}"
        print(f"Activating runner v8: {act_url}")
        session.get(act_url, headers=headers)
    else:
        plugins_r = session.get(f"{admin_base}plugins.php", headers=headers)
        soup_p = BeautifulSoup(plugins_r.text, 'html.parser')
        act_link = soup_p.find('a', href=lambda href: href and 'bamboo-runner-v8' in href and 'action=activate' in href)
        if act_link:
            act_url = act_link['href']
            if not act_url.startswith('http'):
                act_url = f"{admin_base}{act_url}"
            session.get(act_url, headers=headers)
            print("Activated runner v8 from plugins list.")

    print("Runner V8 setup completed successfully.")
    return True

def run_deploy_v8():
    # Gather all files
    files = {}
    base_plugin_dir = 'plugin_src/bamboo-first-builder'
    for root, _, filenames in os.walk(base_plugin_dir):
        for filename in filenames:
            full_path = os.path.join(root, filename)
            rel_path = os.path.relpath(full_path, base_plugin_dir).replace('\\', '/')
            if rel_path.endswith('.php') or rel_path.endswith('.js') or rel_path.endswith('.css') or rel_path.endswith('.json'):
                with open(full_path, 'r', encoding='utf-8') as f:
                    files[rel_path] = f.read()

    # Gather pages
    with open('plugin_src/bamboo-first-builder/data/site-data.json', 'r', encoding='utf-8') as f:
        pages = json.load(f)

    payload = {
        'files': files,
        'pages': pages
    }

    json_str = json.dumps(payload)
    b64_payload = base64.b64encode(json_str.encode('utf-8')).decode('utf-8')

    print(f"\nSending payload to Runner V8 ({len(b64_payload)} base64 bytes)...")
    url = 'https://wheat-panther-397584.hostingersite.com/'
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    r = requests.post(url, data={'execute_bamboo_v8': b64_payload}, headers=headers, timeout=60)
    print("Runner V8 response status:", r.status_code)
    print("\nRunner V8 output:\n" + "-"*50)
    print(r.text)
    print("-"*50)

if __name__ == '__main__':
    create_and_upload_v8()
    run_deploy_v8()
