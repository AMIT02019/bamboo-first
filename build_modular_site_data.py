import os
import re
import json
from bs4 import BeautifulSoup

PAGES_CONFIG = {
    'home': ('index.html', 'Bamboo First'),
    'product-catalogue': ('product-catalogue.html', 'Product Catalogue'),
    'product': ('product.html', 'Product Details'),
    'cart': ('cart.html', 'Shopping Cart'),
    'checkout': ('checkout.html', 'Checkout'),
    'ecotourism': ('ecotourism.html', 'Eco-Tourism'),
    'our-story': ('our-story.html', 'Our Story'),
    'our-mentors': ('our-mentors.html', 'Our Mentors'),
    'media': ('media.html', 'Media Coverage'),
    'contact-us': ('contact-us.html', 'Contact Us'),
    'events': ('events.html', 'Events & Gatherings'),
    'blog': ('blog.html', 'Blog')
}

def convert_links_to_wp(html_str):
    replacements = [
        (r'href="index\.html"', 'href="/"'),
        (r'href="product-catalogue\.html"', 'href="/product-catalogue/"'),
        (r'href="product\.html\?id=', 'href="/product/?id='),
        (r'href="product\.html"', 'href="/product/"'),
        (r'onclick="window\.location\.href=\'product\.html\?id=', 'onclick="window.location.href=\'/product/?id='),
        (r'onclick="window\.location\.href=\'product\.html\'', 'onclick="window.location.href=\'/product/\''),
        (r'href="cart\.html"', 'href="/cart/"'),
        (r'href="checkout\.html"', 'href="/checkout/"'),
        (r'onclick="window\.location\.href=\'cart\.html\'', 'onclick="window.location.href=\'/cart/\''),
        (r'onclick="window\.location\.href=\'checkout\.html\'', 'onclick="window.location.href=\'/checkout/\''),
        (r'href="ecotourism\.html"', 'href="/ecotourism/"'),
        (r'href="our-story\.html"', 'href="/our-story/"'),
        (r'href="our-mentors\.html"', 'href="/our-mentors/"'),
        (r'href="media\.html"', 'href="/media/"'),
        (r'href="contact-us\.html"', 'href="/contact-us/"'),
        (r'href="events\.html"', 'href="/events/"'),
        (r'href="blog\.html"', 'href="/blog/"'),
        (r'href="post/[^"]+"', 'href="/blog/"'),
        (r'src="assets/products/', 'src="/wp-content/plugins/bamboo-first-builder/assets/products/'),
        (r'src="assets/', 'src="/wp-content/plugins/bamboo-first-builder/assets/'),
        (r'srcset="assets/products/', 'srcset="/wp-content/plugins/bamboo-first-builder/assets/products/'),
        (r'srcset="assets/', 'srcset="/wp-content/plugins/bamboo-first-builder/assets/'),
        (r"url\('assets/products/", "url('/wp-content/plugins/bamboo-first-builder/assets/products/"),
        (r"url\('assets/", "url('/wp-content/plugins/bamboo-first-builder/assets/"),
        (r'href="assets/bamboo-first-product-catalogue\.pdf"', 'href="/wp-content/plugins/bamboo-first-builder/assets/bamboo-first-product-catalogue.pdf"')
    ]
    for pattern, repl in replacements:
        html_str = re.sub(pattern, repl, html_str)
    return html_str

def get_section_title(tag, index):
    classes = tag.get('class', [])
    class_str = ' '.join(classes) if isinstance(classes, list) else str(classes)
    tag_id = tag.get('id', '')

    if tag.name == 'header':
        return 'Header & Navigation'
    if tag.name == 'footer':
        return 'Site Footer'
    if 'hero' in class_str or 'page-hero' in class_str or 'hero-slider' in class_str:
        return 'Page Hero Banner'
    if 'breadcrumb' in class_str or tag_id == 'breadcrumbNav':
        return 'Breadcrumb Navigation'
    if 'product-detail' in class_str:
        return 'Product Detail Info & Actions'
    if 'product-tabs' in class_str:
        return 'Product Specifications & Story Tabs'
    if 'artisan-impact' in class_str:
        return 'Artisan Impact Banner'
    if tag_id == 'bulkInquirySection':
        return 'Corporate & Bulk Inquiry Form'
    if 'product-grid' in class_str or 'product-card' in html_tag_preview(tag) or 'catalogue-controls' in html_tag_preview(tag):
        return 'Product Catalogue Grid & Filters'
    if 'catalogue-controls' in class_str:
        return 'Category Filters & Search'
    
    # Try finding an inner heading
    h2 = tag.find(['h2', 'h1', 'h3'])
    if h2 and h2.get_text(strip=True):
        title_text = h2.get_text(strip=True)
        if len(title_text) < 40:
            return title_text
    
    return f'Section {index}'

def html_tag_preview(tag):
    return str(tag)[:200]

def build_modular_dataset():
    site_data = {}

    for slug, (filename, page_title) in PAGES_CONFIG.items():
        if not os.path.exists(filename):
            print(f"Warning: {filename} does not exist. Skipping {slug}.")
            continue

        with open(filename, 'r', encoding='utf-8') as f:
            raw_html = f.read()

        soup = BeautifulSoup(raw_html, 'html.parser')
        body = soup.body
        if not body:
            print(f"Warning: No <body> found in {filename}.")
            continue

        # Extract all direct children of body, ignoring scripts and empty text nodes
        sections = []
        sec_idx = 1

        for child in body.children:
            if not child.name or child.name == 'script':
                continue

            # If it's a wrapper or main, let's see if we should split its children or keep as section
            if child.name == 'main':
                # Split children of main if it contains multiple major sections
                main_children = [mc for mc in child.children if mc.name and mc.name != 'script']
                for mc in main_children:
                    sec_title = get_section_title(mc, sec_idx)
                    sec_html = convert_links_to_wp(str(mc).strip())
                    sections.append({
                        'id': f'sec_{slug}_{sec_idx}',
                        'title': sec_title,
                        'html': sec_html
                    })
                    sec_idx += 1
            else:
                sec_title = get_section_title(child, sec_idx)
                sec_html = convert_links_to_wp(str(child).strip())
                sections.append({
                    'id': f'sec_{slug}_{sec_idx}',
                    'title': sec_title,
                    'html': sec_html
                })
                sec_idx += 1

        site_data[slug] = {
            'title': page_title,
            'sections': sections
        }
        print(f"Generated {slug}: {len(sections)} modular sections")

    # Output to plugin data files
    out_file_1 = 'plugin_src/bamboo-first-builder/data/site-data.json'
    out_file_2 = 'plugin_src/bamboo-first-builder/data/modular-site-data.json'

    os.makedirs(os.path.dirname(out_file_1), exist_ok=True)
    with open(out_file_1, 'w', encoding='utf-8') as f:
        json.dump(site_data, f, indent=2)

    with open(out_file_2, 'w', encoding='utf-8') as f:
        json.dump(site_data, f, indent=2)

    print(f"\nSuccessfully wrote {len(site_data)} pages to {out_file_1} and {out_file_2}")

if __name__ == '__main__':
    build_modular_dataset()
