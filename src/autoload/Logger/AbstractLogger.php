<?php

namespace Cyberway_Greencharts\Logger;

abstract class AbstractLogger implements LoggerInterface
{
  /**
   * Return true if logger should log something, false otherwise
   *
   * @return boolean
   */
  protected function shouldLog()
  {
    return apply_filters('greencharts_logger_shouldLog', defined('WP_DEBUG') && true === WP_DEBUG);
  }

  /**
   * Return true if logger should log info/notice error
   *
   * @return boolean
   */
  protected function shouldBeVerbose()
  {
    return apply_filters('greencharts_logger_shouldBeVerbose', false);
  }

  /**
   * Log message wrapper for all message types
   *
   * @param string $message - the message to log
   * @param string $type - notice|info|warning|error
   * @return boolean - true on log success, false otherwise
   */
  public function log($message, $type)
  {

    if (!$this->shouldLog())
      return false;

    $isLogged = false;

    switch ($type) {
      case 'warning':
        $isLogged = $this->warning($message);
        break;
      case 'info':
      case 'notice':
        if ($this->shouldBeVerbose()) {
          $isLogged = $this->info($message);
        }
        break;
      case 'error':
        $isLogged = $this->error($message);
        break;
      default:
        if ($this->shouldBeVerbose()) {
          $isLogged = $this->info($message);
        }
        break;
    }
    return $isLogged;
  }


  protected function getSuffix()
  {
    $callers = debug_backtrace();
    $mainCaller = isset($callers[2]['function']) && $callers[2]['function'] == 'log' ? $callers[2] : $callers[1];
    return ' in function "' .  $mainCaller['function'] . '" called from "' .  $mainCaller['file'] . '" on line ' .  $mainCaller['line'] . "\n error handler";
  }


  abstract public function info($message);
  abstract public function warning($message);
  abstract public function error($message);
}
