<?php



add_action('wp_ajax_nopriv_climatechange_charts_api', 'climatechange_charts_api');
add_action('wp_ajax_climatechange_charts_api', 'climatechange_charts_api');
function climatechange_charts_api()
{

  $type = sanitize_key($_POST['type']);

  $api = new Cyberway_Climatechange\Api\Api_GlobalWarming;

  switch ($type) {
    case 'co2':
      $data = $api->getCo2();
      break;
    case 'temperature':
      $data = $api->getTemperature();
      break;
    default:
      $data = $api->getCo2();
      break;
  }

  wp_send_json($data);
  wp_die();
}
