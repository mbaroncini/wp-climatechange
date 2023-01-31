<?php

use Cyberway_Climatechange\Chart;




add_action('wp_ajax_nopriv_climatechange_charts_api', 'climatechange_charts_api');
add_action('wp_ajax_climatechange_charts_api', 'climatechange_charts_api');
function climatechange_charts_api()
{

  $type = sanitize_key($_POST['type']);
  $chart = new Chart;
  $cache = $chart->getChartRequestCacheByType($type);

  //$expires = $cache->getDbLifeSpan();

  $maxAge = $cache->getLifeSpanLeft();
  header("Cache-Control: max-age=$maxAge, public");

  $data = apply_filters('climatechange_ajax_chartsApi', $chart->getChartDataByType($type), $type);
  wp_send_json($data);
}
