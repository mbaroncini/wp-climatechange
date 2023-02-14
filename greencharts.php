<?php

/**
 * @package GreenCharts
 */
/*
Plugin Name: Greencharts
Description: Another WordPress plugin with charts but with love for the earth in mind
Version: 1.0.1
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

define('GREENCHARTS__VERSION', '1.0.0');
define('GREENCHARTS__MINIMUM_WP_VERSION', '5.0');
define('GREENCHARTS__PLUGIN_DIR', plugin_dir_path(__FILE__));
define('GREENCHARTS__PLUGIN_DIR_URL', plugin_dir_url(__FILE__));


//LOAD COMPOSER AUTOLOAD AND SINGLE FILES WITH HOOKS
require GREENCHARTS__PLUGIN_DIR . 'src/loader.php';
