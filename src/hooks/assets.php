<?php


/**
 * Proper way to enqueue scripts and styles.
 */
add_action( 'wp_enqueue_scripts', 'climatechange_register_assets' );
function climatechange_register_assets() {

  wp_register_script( 'climatechange-chartjs', 'https://cdn.jsdelivr.net/npm/chart.js', array(), '3.9.1', true );
	wp_register_script( 'climatechange-main', CLIMATECHANGE__PLUGIN_DIR_URL . 'js/index.js', array(
    'climatechange-chartjs',
    'jquery'
  ), '1.0.0', true );
}
