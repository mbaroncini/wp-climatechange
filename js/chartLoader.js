jQuery(document).ready(function ($) {

  const canvasSelector = 'canvas.climatechange-chart'



  //EVENTS HANDLER
  const buttonClick = function (evt) {
    const $this = $(this)
    const $canvas = $this.siblings(canvasSelector)
    $this.text('Loading');
    //ajax request
    $.post({
      url: climatechange.ajaxurl,
      data: { 'action': 'climatechange_charts_api', 'type': $canvas.data('type') },
      success: function (data) {
        loadChart(data, $canvas)
        //$this.remove();
      },
      error: (error) => {
        console.warn(error)
      }
    })
  }
  //FUNCTIONS
  const loadChart = (jsonData, $canvas) => {


    const type = $canvas.data('type');
    const myChart = new Chart(
      $canvas,
      window.climatechange.chartsConfig[`${type}Config`](jsonData)
    );
    const $resetZoomButton = $("<button class=\"climatechange-chart-reset-zoom\">Reset zoom</button>");
    $resetZoomButton.click((evt) => { myChart.resetZoom() });
    $resetZoomButton.insertAfter($canvas)
  }



  $(canvasSelector).each((i, canvas) => {
    const $canvas = $(canvas)
    console.log($canvas)
    $canvas.css({
      height: '300px',
    })
    const $button = $('<button>Load chart</button>');
    $canvas.parent().append($button)
    $button.on('click', buttonClick);
  })



  console.log(climatechange)


})
