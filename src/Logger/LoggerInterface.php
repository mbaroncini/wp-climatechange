<?php

namespace Cyberway_Climatechange\Logger;


interface LoggerInterface
{
  public function log($message, $type);
  public function warning($message);
  public function info($message);
  public function error($message);
}
