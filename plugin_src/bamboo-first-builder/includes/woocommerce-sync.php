<?php
/**
 * Bamboo First — WooCommerce Synchronization & Bridge
 * Integrates Bamboo First products, categories, images, and cart with WooCommerce.
 */

if (!defined('ABSPATH')) {
    exit;
}

class Bamboo_WooCommerce_Sync {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        add_action('init', [$this, 'handle_http_actions']);
        add_action('wp_enqueue_scripts', [$this, 'localize_wc_data'], 1000);
        add_action('admin_menu', [$this, 'add_admin_tools']);
        add_action('template_redirect', [$this, 'handle_template_redirects']);
        add_action('wp_ajax_bamboo_create_wc_order', [$this, 'ajax_create_wc_order']);
        add_action('wp_ajax_nopriv_bamboo_create_wc_order', [$this, 'ajax_create_wc_order']);
    }

    public function handle_template_redirects() {
        if (is_singular('product')) {
            global $post;
            if ($post && !empty($post->post_name)) {
                wp_safe_redirect(home_url('/product/?id=' . urlencode($post->post_name)), 301);
                exit;
            }
        }
    }

    public function ajax_create_wc_order() {
        if (!class_exists('WooCommerce')) {
            wp_send_json_error(['message' => 'WooCommerce is not active']);
        }

        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);
        if (!$data && !empty($_POST)) {
            $data = $_POST;
        }

        if (empty($data['items'])) {
            wp_send_json_error(['message' => 'No items provided']);
        }

        $map = get_option('bamboo_wc_product_map', []);

        try {
            $order = wc_create_order();

            foreach ($data['items'] as $item) {
                $pid = $item['id'];
                $wc_id = $map[$pid] ?? 0;
                $qty = max(1, (int)($item['qty'] ?? 1));

                if ($wc_id) {
                    $prod_obj = wc_get_product($wc_id);
                    if ($prod_obj) {
                        $order->add_product($prod_obj, $qty);
                    }
                }
            }

            $cust = $data['customer'] ?? [];
            $address = [
                'first_name' => sanitize_text_field($cust['name'] ?? 'Artisan Customer'),
                'email'      => sanitize_email($cust['email'] ?? ''),
                'phone'      => sanitize_text_field($cust['phone'] ?? ''),
                'address_1'  => sanitize_text_field($cust['address'] ?? ''),
                'city'       => sanitize_text_field($cust['city'] ?? ''),
                'state'      => sanitize_text_field($cust['state'] ?? 'Maharashtra'),
                'postcode'   => sanitize_text_field($cust['pincode'] ?? ''),
                'country'    => 'IN'
            ];

            $order->set_address($address, 'billing');
            $order->set_address($address, 'shipping');

            $pm = sanitize_text_field($data['paymentMethod'] ?? 'Cash on Delivery');
            if (stripos($pm, 'cash') !== false || stripos($pm, 'cod') !== false) {
                $order->set_payment_method('cod');
                $order->set_payment_method_title('Cash on Delivery');
            } elseif (stripos($pm, 'upi') !== false) {
                $order->set_payment_method('bacs');
                $order->set_payment_method_title('UPI / Instant NetBanking');
            } else {
                $order->set_payment_method('cod');
                $order->set_payment_method_title($pm);
            }

            if (!empty($cust['notes'])) {
                $order->set_customer_note(sanitize_textarea_field($cust['notes']));
            }

            $shipping_fee = (float)($data['shipping'] ?? 0);
            if ($shipping_fee > 0) {
                $item_ship = new WC_Order_Item_Shipping();
                $item_ship->set_method_title('Standard Delivery');
                $item_ship->set_method_id('flat_rate');
                $item_ship->set_total($shipping_fee);
                $order->add_item($item_ship);
            }

            $order->calculate_totals();
            $order->update_status('processing', 'Order placed via Bamboo First storefront.');

            if (!empty($data['orderId'])) {
                $order->update_meta_data('_bamboo_frontend_order_id', sanitize_text_field($data['orderId']));
            }
            $order->save();

            wp_send_json_success([
                'wc_order_id' => $order->get_id(),
                'status' => $order->get_status(),
                'total' => $order->get_total()
            ]);
        } catch (Throwable $e) {
            wp_send_json_error(['message' => $e->getMessage()]);
        }
    }

    public function is_woocommerce_active() {
        return class_exists('WooCommerce');
    }

    public function add_admin_tools() {
        add_submenu_page(
            'bamboo-first-setup',
            'WooCommerce Sync',
            'WooCommerce Sync',
            'manage_options',
            'bamboo-woo-sync',
            [$this, 'render_admin_sync_page']
        );
    }

    public function render_admin_sync_page() {
        if (!current_user_can('manage_options')) return;

        $msg = '';
        if (isset($_POST['run_woo_sync']) && check_admin_referer('bamboo_woo_sync_action')) {
            $result = self::sync_all_products();
            $msg = "<div class='notice notice-success is-dismissible'><p><strong>WooCommerce Sync Complete:</strong> {$result['synced']} products synchronized successfully!</p></div>";
        }

        $map = get_option('bamboo_wc_product_map', []);
        ?>
        <div class="wrap" style="max-width:800px; padding:20px; background:#fff; margin-top:20px; border-radius:8px;">
            <h1 style="color:#4a6138;">Bamboo First &bull; WooCommerce Sync</h1>
            <?php echo $msg; ?>
            <p>Synchronize all 36 Bamboo First handcrafted products (Diwali Kandils, Pen Stands, Trays, Toys, Hampers, Decor) into real WooCommerce products with prices, categories, and images.</p>
            
            <form method="post" action="">
                <?php wp_nonce_field('bamboo_woo_sync_action'); ?>
                <button type="submit" name="run_woo_sync" class="button button-primary button-hero" style="background:#4a6138; border-color:#3d502e;">
                    🔄 Sync All Products to WooCommerce Now
                </button>
            </form>

            <h3 style="margin-top:30px;">Currently Synchronized WooCommerce Products (<?php echo count($map); ?>):</h3>
            <table class="widefat striped" style="margin-top:10px;">
                <thead>
                    <tr><th>Slug</th><th>WooCommerce ID</th><th>View Product</th></tr>
                </thead>
                <tbody>
                    <?php if (empty($map)): ?>
                        <tr><td colspan="3">No products synchronized yet. Click the button above to sync.</td></tr>
                    <?php else: ?>
                        <?php foreach ($map as $slug => $wc_id): ?>
                            <tr>
                                <td><code><?php echo esc_html($slug); ?></code></td>
                                <td><strong>#<?php echo esc_html($wc_id); ?></strong></td>
                                <td><a href="<?php echo esc_url(get_permalink($wc_id)); ?>" target="_blank">View in Store &rarr;</a></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        <?php
    }

    public function handle_http_actions() {
        if (isset($_POST['execute_bamboo_woo'])) {
            header('Content-Type: text/plain; charset=utf-8');
            echo "=== BAMBOO WOOCOMMERCE SYNC ENGINE ===\n";

            if (!$this->is_woocommerce_active()) {
                echo "ERROR: WooCommerce plugin is not active on this site.\n";
                exit;
            }

            $res = self::sync_all_products();
            echo "\nTotal Processed: " . $res['total'] . "\n";
            echo "Successfully Synced: " . $res['synced'] . "\n";
            if (!empty($res['errors'])) {
                echo "\nErrors:\n" . implode("\n", $res['errors']) . "\n";
            }
            echo "\n=== SYNC COMPLETED SUCCESSFULLY ===\n";
            exit;
        }
    }

    public static function sync_all_products() {
        if (!class_exists('WooCommerce')) {
            return ['total' => 0, 'synced' => 0, 'errors' => ['WooCommerce not installed/active']];
        }

        // 1. Configure WooCommerce Options
        self::configure_woocommerce();

        // 2. Load Products Data
        $json_file = plugin_dir_path(dirname(__FILE__)) . 'data/products.json';
        if (!file_exists($json_file)) {
            return ['total' => 0, 'synced' => 0, 'errors' => ["products.json not found at {$json_file}"]];
        }

        $products = json_decode(file_get_contents($json_file), true);
        if (!is_array($products)) {
            return ['total' => 0, 'synced' => 0, 'errors' => ['Invalid JSON in products.json']];
        }

        $map = get_option('bamboo_wc_product_map', []);
        $synced_count = 0;
        $errors = [];

        foreach ($products as $p) {
            try {
                $wc_id = self::create_or_update_product($p);
                if ($wc_id) {
                    $map[$p['id']] = $wc_id;
                    $synced_count++;
                    echo "  + [WC #{$wc_id}] {$p['name']} (₹{$p['priceNum']}) -> {$p['category']}\n";
                }
            } catch (Throwable $e) {
                $err = "Error on '{$p['id']}': " . $e->getMessage();
                $errors[] = $err;
                echo "  ! {$err}\n";
            }
        }

        update_option('bamboo_wc_product_map', $map);
        return [
            'total' => count($products),
            'synced' => $synced_count,
            'map' => $map,
            'errors' => $errors
        ];
    }

    private static function configure_woocommerce() {
        // Disable Coming Soon mode completely
        update_option('woocommerce_coming_soon', 'no');
        update_option('woocommerce_store_pages_only', 'no');

        // Indian Rupee currency & formatting
        update_option('woocommerce_currency', 'INR');
        update_option('woocommerce_currency_pos', 'left');
        update_option('woocommerce_price_thousand_sep', ',');
        update_option('woocommerce_price_decimal_sep', '.');
        update_option('woocommerce_price_num_decimals', 0);

        // Enable Cash on Delivery
        $cod_settings = get_option('woocommerce_cod_settings', []);
        $cod_settings['enabled'] = 'yes';
        $cod_settings['title'] = 'Cash on Delivery';
        $cod_settings['description'] = 'Pay with cash upon delivery of your handcrafted bamboo products.';
        update_option('woocommerce_cod_settings', $cod_settings);

        // Enable Direct Bank Transfer / UPI
        $bacs_settings = get_option('woocommerce_bacs_settings', []);
        $bacs_settings['enabled'] = 'yes';
        $bacs_settings['title'] = 'Direct Bank Transfer / UPI';
        $bacs_settings['description'] = 'Make your payment directly into our bank account or via UPI.';
        update_option('woocommerce_bacs_settings', $bacs_settings);

        // Do NOT let WooCommerce hijack Elementor canvas templates (Product Catalogue, Cart, Checkout)
        delete_option('woocommerce_shop_page_id');
        delete_option('woocommerce_cart_page_id');
        delete_option('woocommerce_checkout_page_id');

        // AJAX Add to Cart
        update_option('woocommerce_enable_ajax_add_to_cart', 'yes');
        update_option('woocommerce_cart_redirect_after_add', 'no');
    }

    private static function create_or_update_product($data) {
        $slug = sanitize_title($data['id']);
        $title = sanitize_text_field($data['name']);
        $price = (float)($data['priceNum'] ?? 0);
        $category_name = sanitize_text_field($data['category'] ?? 'Handcrafted');
        $desc = wp_kses_post($data['desc'] ?? '');
        $dimensions = sanitize_text_field($data['dimensions'] ?? '');

        // Check if product exists by post_name in wp_posts
        global $wpdb;
        $existing_id = $wpdb->get_var($wpdb->prepare(
            "SELECT ID FROM {$wpdb->posts} WHERE post_type = 'product' AND post_name = %s LIMIT 1",
            $slug
        ));

        if ($existing_id) {
            $product = wc_get_product((int)$existing_id);
            if (!$product) {
                $product = new WC_Product_Simple();
            }
        } else {
            $product = new WC_Product_Simple();
        }

        $product->set_name($title);
        $product->set_slug($slug);
        $product->set_status('publish');
        $product->set_catalog_visibility('visible');
        $product->set_regular_price($price);
        $product->set_price($price);
        $product->set_description($desc);
        $product->set_short_description($dimensions ? "Dimensions: {$dimensions}" : '');
        $product->set_sku('BF-' . strtoupper(str_replace('-', '', $slug)));
        $product->set_manage_stock(false);
        $product->set_stock_status('instock');

        // Assign Category
        $term_id = 0;
        $term = get_term_by('name', $category_name, 'product_cat');
        if (!$term) {
            $term_info = wp_insert_term($category_name, 'product_cat');
            if (!is_wp_error($term_info) && isset($term_info['term_id'])) {
                $term_id = (int)$term_info['term_id'];
            }
        } else {
            $term_id = (int)$term->term_id;
        }

        if ($term_id) {
            $product->set_category_ids([$term_id]);
        }

        // Attach Image
        if (!empty($data['img'])) {
            $img_id = self::get_or_create_attachment($data['img'], $title);
            if ($img_id) {
                $product->set_image_id($img_id);
            }
        }

        // Attach Gallery Images
        if (!empty($data['gallery']) && is_array($data['gallery'])) {
            $gallery_ids = [];
            foreach ($data['gallery'] as $g_path) {
                $gid = self::get_or_create_attachment($g_path, $title);
                if ($gid && $gid !== $product->get_image_id()) {
                    $gallery_ids[] = $gid;
                }
            }
            if (!empty($gallery_ids)) {
                $product->set_gallery_image_ids($gallery_ids);
            }
        }

        // Custom Meta
        $product->update_meta_data('_bamboo_id', $data['id']);
        $product->update_meta_data('_bamboo_dimensions', $dimensions);
        if (!empty($data['highlights'])) {
            $product->update_meta_data('_bamboo_highlights', json_encode($data['highlights']));
        }

        $saved_id = $product->save();
        return (int)$saved_id;
    }

    private static function get_or_create_attachment($rel_path, $title) {
        $clean_path = preg_replace('/\?.*$/', '', $rel_path);
        $plugin_root = dirname(dirname(__FILE__));
        $full_path = $plugin_root . '/' . ltrim($clean_path, '/');

        if (!file_exists($full_path)) {
            return 0;
        }

        $filename = basename($clean_path);

        // Check if attachment exists by guid or filename
        global $wpdb;
        $attachment_id = $wpdb->get_var($wpdb->prepare(
            "SELECT ID FROM {$wpdb->posts} WHERE post_type = 'attachment' AND (guid LIKE %s OR post_title = %s) LIMIT 1",
            '%' . $wpdb->esc_like($filename) . '%',
            $title . ' Image'
        ));

        if ($attachment_id) {
            return (int)$attachment_id;
        }

        // Copy file into WordPress uploads directory
        $upload_dir = wp_upload_dir();
        $target_dir = $upload_dir['path'];
        if (!is_dir($target_dir)) {
            wp_mkdir_p($target_dir);
        }

        $unique_filename = wp_unique_filename($target_dir, $filename);
        $target_file = $target_dir . '/' . $unique_filename;
        copy($full_path, $target_file);

        $file_type = wp_check_filetype($unique_filename, null);
        $attachment = [
            'post_mime_type' => $file_type['type'] ?: 'image/webp',
            'post_title'     => sanitize_text_field($title . ' Image'),
            'post_content'   => '',
            'post_status'    => 'inherit'
        ];

        require_once ABSPATH . 'wp-admin/includes/image.php';
        require_once ABSPATH . 'wp-admin/includes/media.php';

        $attach_id = wp_insert_attachment($attachment, $target_file);
        if ($attach_id && !is_wp_error($attach_id)) {
            $attach_data = wp_generate_attachment_metadata($attach_id, $target_file);
            wp_update_attachment_metadata($attach_id, $attach_data);
            return (int)$attach_id;
        }

        return 0;
    }

    public function localize_wc_data() {
        $map = get_option('bamboo_wc_product_map', []);
        $cart_count = 0;
        if (function_exists('WC') && WC()->cart) {
            $cart_count = WC()->cart->get_cart_contents_count();
        }

        $config = [
            'active'       => $this->is_woocommerce_active(),
            'ajax_url'     => admin_url('admin-ajax.php'),
            'wc_ajax_url'  => home_url('/?wc-ajax='),
            'products'     => $map,
            'cart_count'   => $cart_count,
            'cart_url'     => function_exists('wc_get_cart_url') ? wc_get_cart_url() : home_url('/cart/'),
            'checkout_url' => function_exists('wc_get_checkout_url') ? wc_get_checkout_url() : home_url('/checkout/')
        ];

        wp_localize_script('bamboo-site-js', 'BAMBOO_WOO_CONFIG', $config);
    }
}

Bamboo_WooCommerce_Sync::get_instance();
