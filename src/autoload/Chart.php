<?php

namespace Cyberway_Greencharts;

use Cyberway_Greencharts\Api\Api_GlobalWarming;


class Chart
{

  function getChartRequestCacheByType($type)
  {
    $globalWarmingApi = new Api_GlobalWarming;

    $cache = $globalWarmingApi->requestCache($globalWarmingApi->config[$type]);

    return $cache;
  }

  function getChartDataByType($type)
  {

    $globalWarmingApi = new Api_GlobalWarming;

    switch ($type) {
      case 'co2':
        $data = $globalWarmingApi->getCo2();
        break;
      case 'temperature':
        $data = $globalWarmingApi->getTemperature();
        break;
      case 'methane':
        $data = $globalWarmingApi->getMethane();
        break;
      case 'oceanwarming':
        $data = $globalWarmingApi->getOceanWarming();
        break;
      default:
        $data = $globalWarmingApi->getCo2();
        break;
    }
    return $data;
  }
}
