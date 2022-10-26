<?php


add_shortcode('climatechange_chart', 'climatechange_shortcode_chart');
function climatechange_shortcode_chart() {
  wp_enqueue_script( 'climatechange-main' );

  ob_start();
  ?>
  <div id="climatechange-chart"></div>
  <?php

  $content = ob_get_clean();
  return $content;
}
