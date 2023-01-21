import axios from 'axios'
import * as chartsConfig from './chartsConfig'
import { Chart } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import options from './store'
import log from './logger'

Chart.register(zoomPlugin);


export const loadChart = (canvas: HTMLCanvasElement) => {


  const chartType: string = canvas.dataset.type;
  const loadChartButton = document.createElement('button');
  loadChartButton.innerText = 'Load chart';
  const resetZoomButton = document.createElement('button');
  resetZoomButton.classList.add('climatechange-chart-reset-zoom')
  resetZoomButton.innerText = 'Reset zoom'

  canvas.parentElement.append(loadChartButton)


  //EVENTS HANDLER
  const getChartData = function (evt: Event) {
    log('---------------------------------- INIT CHART LOAD ----------------------------------')
    log('CLICKED CHART LOADER:', evt.target)
    loadChartButton.innerText = 'Loading';

    //Prepare POST arguments as URL params
    const params = new URLSearchParams();
    params.append('action', options.ajaxAction);
    params.append('type', chartType);

    //ajax POST request
    axios.post(window.climatechange.ajaxurl, params)
      .then(function (response) {

        const chartConfig: any = chartsConfig[`${chartType}Config` as keyof typeof chartsConfig](response.data)
        log('AJAX POST RESPONSE:', response)
        log('CANVAS FOR CHART:', canvas)
        log('COMPUTED CHART CONFIG:', chartConfig)

        const myChart = new Chart(
          canvas,
          chartConfig
        );
        log('CHARTJS OBJECT:', myChart)

        resetZoomButton.addEventListener('click', (evt) => { myChart.resetZoom() });

        loadChartButton.remove()
        //loadChartButton.innerText = 'Re-load';

        canvas.parentElement.append(resetZoomButton)

        log('---------------------------------- CHART LOADED ----------------------------------')

      })
      .catch((error) => {
        console.warn(error)
      })
  }



  loadChartButton.addEventListener('click', getChartData);



}















