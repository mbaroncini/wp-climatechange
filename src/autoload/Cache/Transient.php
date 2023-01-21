<?php

namespace Cyberway_Climatechange\Cache;


class Transient
{

  /**
   * User provided key for transient
   *
   * @var string
   */
  protected $key;

  /**
   * Transient lifespan in seconds
   *
   * @var int
   */
  protected $lifespan = 60 * 24 * 30; //1 month in seconds


  /**
   * Create Transient object with sanitized key
   *
   * @param string $key
   */
  public function __construct($key)
  {
    $this->key = sanitize_key($key);
  }

  /**
   * Generate a special transient key from user provided key.
   * The use of class name and plugin version is a trick to invalidate cache ;)
   *
   * @return string
   */
  protected function getKey()
  {
    return $this->key . '_' . __CLASS__ . '_' . CLIMATECHANGE__VERSION;
  }

  /**
   * Get user provided lifespan for A NEW transient or default one otherwise
   * Important: it doesnt return the lifespan stored in the database
   *
   * @return int
   */
  protected function getLifeSpan()
  {
    return $this->lifespan;
  }

  /**
   * Set lifespan in seconds for A NEW transient
   *
   * @param int $seconds
   * @return true
   */
  public function setLifeSpan($seconds)
  {
    $this->lifespan = absint($seconds);
    return true;
  }

  /**
   * Get the transient value
   *
   * @return mixed
   */
  public function get()
  {
    if ($this->isCacheDisabled()) {
      $this->delete(); //enforce cache delete on value get
    }

    return get_transient($this->getKey());
  }

  /**
   * Delete the transient
   *
   * @return bool
   */
  public function delete()
  {
    return delete_transient($this->getKey());
  }

  /**
   * Set transient value
   *
   * @param mixed $value
   * @return bool
   */
  public function set($value)
  {
    if ($this->isCacheDisabled()) {
      return false; //don't store transient if cache is disabled
    }

    return set_transient($this->getKey(), $value, $this->getLifeSpan());
  }


  /**
   * Return the lifespan left to this transient in seconds
   *
   * @return int
   */
  public function getLifeSpanLeft()
  {
    $expires = (int) get_option('_transient_timeout_' . $this->getKey(), 0);
    return $expires - time();
  }


  protected function isCacheDisabled()
  {
    return apply_filters('climatechange_transient_disableCache', false);
  }
}
