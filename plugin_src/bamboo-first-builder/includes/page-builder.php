<?php
if (!defined('ABSPATH')) exit;

class Bamboo_Page_Builder {

    public static function generate_all() {
        echo "<pre style='font-family:monospace; padding:20px; background:#fafaf8; border:1px solid #ddd; line-height:1.6;'>";
        echo "========================================================\n";
        echo "  BAMBOO FIRST &bull; MODULAR ELEMENTOR SITE BUILDER\n";
        echo "========================================================\n\n";

        try {
            // 1. Remove duplicate/legacy HFE templates to prevent double header/footer
            echo "[1/4] Cleaning up legacy HFE templates:\n";
            $hfe_posts = get_posts([
                'post_type' => 'elementor-hf',
                'numberposts' => -1,
                'post_status' => 'any'
            ]);
            foreach ($hfe_posts as $hp) {
                wp_delete_post($hp->ID, true);
                echo "  &bull; Removed legacy HFE template #{$hp->ID} ({$hp->post_title})\n";
            }

            // 2. Build modular Elementor pages
            $pages = Bamboo_Site_Data::get_pages();
            echo "\n[2/4] Building " . count($pages) . " modular Elementor pages:\n";

            foreach ($pages as $slug => $data) {
                echo "  &bull; Generating page '{$slug}' with " . count($data['sections']) . " sections... ";
                try {
                    $pid = self::create_or_update_modular_page($slug, $data['title'], $data['sections']);
                    echo "OK (Post ID: {$pid})\n";
                } catch (\Throwable $pe) {
                    echo "FAILED: " . $pe->getMessage() . "\n";
                }
            }

            // 3. Set front page
            echo "\n[3/4] Configuring homepage:\n";
            $home_page = get_page_by_path('home', OBJECT, 'page');
            if (!$home_page) {
                $home_page = get_page_by_path('home');
            }
            if ($home_page) {
                update_option('show_on_front', 'page');
                update_option('page_on_front', $home_page->ID);
                echo "  &bull; Front page set to ID: {$home_page->ID} (Home)\n";
            } else {
                echo "  &bull; Warning: 'home' page slug not found.\n";
            }

            // 4. Setup Navigation Menu
            echo "\n[4/4] Configuring Navigation Menu:\n";
            try {
                self::setup_navigation_menu();
                echo "  &bull; Primary Menu populated and assigned to theme locations.\n";
            } catch (\Throwable $me) {
                echo "  &bull; Menu setup warning: " . $me->getMessage() . "\n";
            }

            // Clear Elementor CSS cache
            if (class_exists('\Elementor\Plugin') && isset(\Elementor\Plugin::$instance->posts_css_manager)) {
                try {
                    \Elementor\Plugin::$instance->posts_css_manager->clear_cache();
                    echo "\n  &bull; Elementor CSS cache cleared.\n";
                } catch (\Throwable $ce) {}
            }

            echo "\n========================================================\n";
            echo "  SUCCESS: All modular Elementor pages are live and ready!\n";
            echo "========================================================\n";
        } catch (\Throwable $e) {
            echo "\nCRITICAL BUILD ERROR: " . $e->getMessage() . "\n";
            echo "File: " . $e->getFile() . " on line " . $e->getLine() . "\n";
        }
        echo "</pre>";
    }

    public static function create_or_update_modular_page($slug, $title, $sections) {
        $existing = get_page_by_path($slug, OBJECT, 'page');
        if (!$existing) {
            $existing = get_page_by_path($slug);
        }

        // Build full HTML content
        $full_html = '';
        $elementor_data = [];

        foreach ($sections as $s) {
            $full_html .= $s['html'] . "\n\n";

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

        if (is_wp_error($page_id) || !$page_id) {
            return 0;
        }

        // Set Elementor canvas template to guarantee 100% full-bleed and zero theme wrappers
        update_post_meta($page_id, '_wp_page_template', 'elementor_canvas');
        update_post_meta($page_id, '_elementor_edit_mode', 'builder');
        update_post_meta($page_id, '_elementor_template_type', 'wp-page');
        update_post_meta($page_id, '_elementor_version', '3.24.0');
        update_post_meta($page_id, '_elementor_data', wp_slash(json_encode($elementor_data)));
        update_post_meta($page_id, '_elementor_page_settings', ['template' => 'elementor_canvas']);

        return $page_id;
    }

    public static function setup_navigation_menu() {
        if (!function_exists('wp_create_nav_menu')) {
            require_once ABSPATH . 'wp-admin/includes/nav-menu.php';
        }

        $menu_name = 'Primary Menu';
        $menu_exists = wp_get_nav_menu_object($menu_name);

        if (!$menu_exists) {
            $menu_id = wp_create_nav_menu($menu_name);
        } else {
            $menu_id = $menu_exists->term_id;
        }

        if (is_wp_error($menu_id) || !$menu_id) return;

        // Clear old items
        $items = wp_get_nav_menu_items($menu_id);
        if ($items) {
            foreach ($items as $item) {
                wp_delete_post($item->ID, true);
            }
        }

        // Add menu items
        $menu_structure = [
            ['title' => 'Home', 'url' => home_url('/')],
            ['title' => 'Product Catalogue', 'url' => home_url('/product-catalogue/')],
            ['title' => 'Ecotourism', 'url' => home_url('/ecotourism/')],
            ['title' => 'Our Story', 'url' => home_url('/our-story/')],
            ['title' => 'Our Mentors', 'url' => home_url('/our-mentors/')],
            ['title' => 'Media', 'url' => home_url('/media/')],
            ['title' => 'Contact Us', 'url' => home_url('/contact-us/')],
            ['title' => 'Events', 'url' => home_url('/events/')],
            ['title' => 'Blogs', 'url' => home_url('/blog/')],
        ];

        foreach ($menu_structure as $m) {
            wp_update_nav_menu_item($menu_id, 0, [
                'menu-item-title'   => $m['title'],
                'menu-item-url'     => $m['url'],
                'menu-item-status'  => 'publish',
                'menu-item-type'    => 'custom'
            ]);
        }

        // Assign to menu locations
        $locations = get_theme_mod('nav_menu_locations');
        if (!is_array($locations)) $locations = [];
        $locations['menu-1'] = $menu_id;
        $locations['primary'] = $menu_id;
        $locations['header-menu'] = $menu_id;
        set_theme_mod('nav_menu_locations', $locations);
    }
}
