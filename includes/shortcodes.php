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

  $test = "<pre>" . print_r($type, true) . "</pre>";


  wp_enqueue_script('climatechange-chart-loader');

  return "$test<div><canvas id=\"$id\" class=\"$class\" data-type=\"$type\"></canvas></div>";
}
