"""
deploy_with_pages.py  —  push site.js + site-data.json AND update Elementor pages
"""
import os, json, base64, requests

WP_URL = "https://wheat-panther-397584.hostingersite.com/"
PLUGIN_DIR = "plugin_src/bamboo-first-builder"

files = {}
rel_files = [
    "bamboo-first-builder.php",
    "includes/woocommerce-sync.php",
    "data/products.json",
    "assets/site.js",
    "assets/site.css",
    "data/site-data.json"
]
for rel in rel_files:
    path = os.path.join(PLUGIN_DIR, rel)
    with open(path, encoding="utf-8") as f:
        files[rel] = f.read()
    print(f"  Loaded {rel} ({len(files[rel])} chars)")

# Load pages (site-data.json IS the pages manifest)
with open(os.path.join(PLUGIN_DIR, "data", "site-data.json"), encoding="utf-8") as f:
    pages = json.load(f)

print(f"  Pages to update: {list(pages.keys())}")

payload = {
    "files": files,
    "binary_files": {},
    "pages": pages
}

json_str = json.dumps(payload)
b64 = base64.b64encode(json_str.encode("utf-8")).decode("utf-8")
print(f"\nPayload size: {len(b64)} base64 chars")

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
print("Sending to Runner V10...")
r = requests.post(WP_URL, data={"execute_bamboo_v10": b64}, headers=headers, timeout=120)
print("Status:", r.status_code)
print(r.text[:3000])
print("\nDone.")
