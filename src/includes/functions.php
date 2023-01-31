<?php

use Cyberway_Greencharts\Logger\PhpLogger;

function greencharts_logger()
{
  return apply_filters('greencharts_logger', new PhpLogger);
}
