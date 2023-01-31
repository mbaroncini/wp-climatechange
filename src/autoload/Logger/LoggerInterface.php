<?php

namespace Cyberway_Greencharts\Logger;


interface LoggerInterface
{
  public function log($message, $type);
  public function warning($message);
  public function info($message);
  public function error($message);
}
