<?php

namespace Cyberway_Climatechange\Logger;



class PhpLogger extends AbstractLogger implements LoggerInterface
{

  public function warning($message)
  {
    return trigger_error($message, E_USER_WARNING);
  }

  public function info($message)
  {
    return trigger_error($message, E_USER_NOTICE);
  }

  public function error($message)
  {
    return trigger_error($message, E_USER_ERROR);
  }
}
