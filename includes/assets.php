<?php


/**
 * Proper way to enqueue scripts and styles.
 */
add_action('wp_enqueue_scripts', 'climatechange_register_assets');
function climatechange_register_assets()
{

  /**
   * Chartjs libraries
   */
  wp_register_script('climatechange-chartjs', 'https://cdn.jsdelivr.net/npm/chart.js', [], '3.9.1', true);

  // chartjs-plugin-zoom: https://www.chartjs.org/chartjs-plugin-zoom/latest/
  wp_register_script('climatechange-hammerjs', 'https://cdn.jsdelivr.net/npm/hammerjs@2.0.8', [], '2.0.8', true);
  wp_register_script('climatechange-chartjs-plugin-zoom', 'https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom@2.0.0/dist/chartjs-plugin-zoom.min.js', [
    'climatechange-hammerjs'
  ], '2.0.0', true);

  /**
   * Chartjs loader
   */
  wp_register_script('climatechange-chart-loader', CLIMATECHANGE__PLUGIN_DIR_URL . 'js/chartLoader.js', array(
    'climatechange-chartjs',
    'climatechange-charts',
    'climatechange-chartjs-plugin-zoom',
    'jquery'
  ), '1.0.0', true);
  //charts configs
  wp_register_script('climatechange-charts', CLIMATECHANGE__PLUGIN_DIR_URL . 'js/charts.js', [], '1.0.0', true);
  //charts window var
  wp_localize_script(
    'climatechange-charts',
    'climatechange',
    [
      'ajaxurl' => admin_url('admin-ajax.php')
    ]
  );
}
