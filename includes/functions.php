<?php

use Cyberway_Climatechange\Logger\PhpLogger;

function climatechange_logger()
{
  return apply_filters('climatechange_logger', new PhpLogger);
}
