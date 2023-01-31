<?php


add_shortcode('climatechange-chart', 'climatechange_shortcode_chart');
function climatechange_shortcode_chart($atts)
{

  extract(
    shortcode_atts(array(
      'type' => 'co2',
    ), $atts, 'climatechange-chart')
  );

  $class = 'climatechange-chart';
  $id = $class . '-' . strval(rand());

  //wp_enqueue_script('climatechange-chart-loader');
  wp_enqueue_script('climatechange-chart-loader');

  return "<div class=\"$class-wrapper\"><canvas id=\"$id\" class=\"$class\" data-type=\"$type\"></canvas></div>";
}
