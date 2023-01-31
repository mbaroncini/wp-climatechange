<?php


/**
 * Proper way to enqueue scripts and styles.
 */
add_action('wp_enqueue_scripts', 'greencharts_register_assets');
function greencharts_register_assets()
{
  //enqueued in shortcode
  wp_register_script('greencharts-chart-loader', CLIMATECHANGE__PLUGIN_DIR_URL . 'dist/main.js', ['wp-hooks'], '1.0.0', true);

  wp_localize_script(
    'greencharts-chart-loader',
    'greencharts',
    [
      'ajaxurl' => admin_url('admin-ajax.php'),
      'charts' => []
    ]
  );
}


/**
 * Enqueue a script in the WordPress admin on edit.php.
 *
 * @param int $hook Hook suffix for the current admin page.
 */
// add_action('admin_enqueue_scripts', 'greencharts_register_admin_assets');
// function greencharts_register_admin_assets($hook)
// {
//   $charts = new Charts;
//   wp_localize_script('wp-block-editor', 'greencharts', [
//     'chartsConfig' => $charts->getAvailableChartsConf()
//   ]);
// }
