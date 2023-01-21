<?php

namespace Cyberway_Climatechange\Api;

use WP_Error;
use Cyberway_Climatechange\Cache\Transient;

class Api
{

  /**
   * Undocumented function
   *
   * alias
   *
   * @param [type] $url
   * @return Transient
   */
  protected function requestCache($url)
  {
    return $this->dataCache($url);
  }

  /**
   *
   * This function creates a new Transient object with a given key.
   * A Transient object is used to store data temporarily in a cache.
   * This function can be used to quickly access the data stored in the cache without having to manually create
   * a new Transient object each time.
   *
   * @param [type] $key
   * @return \Cyberway_Climatechange\Cache\Transient
   */
  protected function dataCache($key)
  {
    return new Transient($key);
  }


  /**
   * This code is a function that retrieves data from a given URL.
   * It first checks to see if the data has been cached, and if it has, it returns the cached value.
   * If the data has not been cached, it uses the WordPress function wp_remote_get() to retrieve the data from the URL and then checks to make sure that the response is valid.
   * If it is valid, it sets the cache with this response and returns it. If there is an error with the response, it returns a WP_Error object.
   *
   * @param [type] $url
   * @param array $getArgs
   * @return WP_Error|string
   */
  public function get($url, $getArgs = [])
  {
    $this->info("Getting $url data");
    $cache = $this->requestCache($url);
    $cachedValue = $cache->get();
    if (empty($cachedValue)) {
      $this->info("$url data is NOT CACHED, getting data remotely");

      $response = wp_remote_get($url, $getArgs);
      $check = $this->checkResponse($response);
      if ($check !== FALSE) {
        $this->info("Ok, got data, saving response on cache");
        $cache->set($response);
        return $response;
      } else {
        $this->logger()->error("Bad GET response from $url");
        return new WP_Error('climatechange_api_get', "Bad GET response from $url");
      }
    } else {
      $this->info("$url data IS CACHED");
    }


    return $cachedValue;
  }

  /**
   * Given an HTTP response, check it to see if it is worth storing.
   *
   * @param Wp_Response $response
   * @return false|int
   */
  protected function checkResponse($response)
  {

    // Is the response an array?
    if (!is_array($response)) {
      return FALSE;
    }

    // Is the response a wp error?
    if (is_wp_error($response)) {
      return FALSE;
    }

    // Is the response weird?
    if (!isset($response['response'])) {
      return FALSE;
    }

    // Is there a status code?
    if (!isset($response['response']['code'])) {
      return FALSE;
    }

    // Is the status code bad?
    if (in_array($response['response']['code'], [401, 404, 505])) {
      return FALSE;
    }

    // We made it!  Return the status code, just for posterity's sake.
    return (int) $response['response']['code'];
  }


  protected function logger()
  {
    return \climatechange_logger();
  }

  protected function info($message)
  {
    return $this->logger()->log(__CLASS__ . ' |!| ' . $message, 'info');
  }
}
