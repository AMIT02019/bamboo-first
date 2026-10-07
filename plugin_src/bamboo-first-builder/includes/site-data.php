<?php
if (!defined('ABSPATH')) exit;

class Bamboo_Site_Data {
    private static $pages = null;

    private static function load_data() {
        if (self::$pages === null) {
            $file = plugin_dir_path(dirname(__FILE__)) . 'data/site-data.json';
            if (file_exists($file)) {
                $json = file_get_contents($file);
                self::$pages = json_decode($json, true);
            } else {
                self::$pages = [];
            }
        }
    }

    public static function get_pages() {
        self::load_data();
        return is_array(self::$pages) ? self::$pages : [];
    }
}
