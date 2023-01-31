<?php


add_shortcode('greencharts-chart', 'greencharts_shortcode_chart');
function greencharts_shortcode_chart($atts)
{

  extract(
    shortcode_atts(array(
      'type' => 'co2',
    ), $atts, 'greencharts-chart')
  );

  $class = 'greencharts-chart';
  $id = $class . '-' . strval(rand());

  //wp_enqueue_script('greencharts-chart-loader');
  wp_enqueue_script('greencharts-chart-loader');

  return "<div class=\"$class-wrapper\"><canvas id=\"$id\" class=\"$class\" data-type=\"$type\"></canvas></div>";
}
