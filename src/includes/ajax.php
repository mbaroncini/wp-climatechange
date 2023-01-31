<?php

use Cyberway_Greencharts\Chart;




add_action('wp_ajax_nopriv_greencharts_charts_api', 'greencharts_charts_api');
add_action('wp_ajax_greencharts_charts_api', 'greencharts_charts_api');
function greencharts_charts_api()
{

  $type = sanitize_key($_POST['type']);
  $chart = new Chart;
  $cache = $chart->getChartRequestCacheByType($type);

  //$expires = $cache->getDbLifeSpan();

  $maxAge = $cache->getLifeSpanLeft();
  header("Cache-Control: max-age=$maxAge, public");

  $data = apply_filters('greencharts_ajax_chartsApi', $chart->getChartDataByType($type), $type);
  wp_send_json($data);
}
