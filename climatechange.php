<?php

/**
 * @package ClimateChange
 */
/*
Plugin Name: ClimateChange data
Description: Display https://global-warming.org/ data
Version: 0.1.0
Requires at least: 5.0
Requires PHP: ^7.4
Author: Cyberway
License: GPLv2 or later
Text Domain: greencharts
*/

// Make sure we don't expose any info if called directly
if (!function_exists('add_action')) {
	echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
	exit;
}

define('CLIMATECHANGE__VERSION', '1.0.0');
define('CLIMATECHANGE__MINIMUM_WP_VERSION', '5.0');
define('CLIMATECHANGE__PLUGIN_DIR', plugin_dir_path(__FILE__));
define('CLIMATECHANGE__PLUGIN_DIR_URL', plugin_dir_url(__FILE__));


//LOAD COMPOSER AUTOLOAD AND SINGLE FILES WITH HOOKS
require CLIMATECHANGE__PLUGIN_DIR . 'src/loader.php';
