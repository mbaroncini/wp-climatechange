
import * as chartsConfig from './chartsConfig'
import { Chart } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import options from './store'
import log from './logger'
import { post } from './http'


Chart.register(zoomPlugin);

export const loadChart = (canvas: HTMLCanvasElement) => {

  const chartType: string = canvas.dataset.type;
  const loadChartButton = document.createElement('div');
  loadChartButton.classList.add('climatechange-button')
  const loadButtonText: any = options.globalHooks.applyFilters('climatechange_js_loadButtonText', 'Load chart', canvas)
  loadChartButton.innerText = loadButtonText;
  const resetZoomButton = document.createElement('div');
  resetZoomButton.classList.add('climatechange-chart-reset-zoom', 'climatechange-button')
  const resetButtonText: any = options.globalHooks.applyFilters('climatechange_js_resetZoomButtonText', 'Reset zoom', canvas)
  resetZoomButton.innerText = resetButtonText

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

    post(handleChartData, params)

  }


  const handleChartData = (data: any, error?: any) => {

    log('CANVAS FOR CHART:', canvas)

    loadChartButton.remove()
    //loadChartButton.innerText = 'Re-load';

    if (typeof error == 'object') {
      const errorMessage: any = options.globalHooks.applyFilters('climatechange_js_errorMessage', "Something goes wrong during chart loading. Please retry later", data, error)
      canvas.parentElement.innerHTML = errorMessage
    }
    else {
      let chartConfig: any = chartsConfig[`${chartType}Config` as keyof typeof chartsConfig](data)

      chartConfig = options.globalHooks.applyFilters('climatechange_js_chartConfig', chartConfig, canvas)

      log('COMPUTED CHART CONFIG:', chartConfig)

      const myChart = new Chart(
        canvas,
        chartConfig
      );
      log('CHARTJS OBJECT:', myChart)

      resetZoomButton.addEventListener('click', (evt) => { myChart.resetZoom() });

      canvas.parentElement.append(resetZoomButton)

      log('APPEND CREATED CHART ON WINDOW OBJECT, TRY ON CONSOLE: "window.climatechange.charts"')
      window.climatechange.charts.push(myChart)
    }




    log('---------------------------------- CHART LOADED ----------------------------------')

  }



  loadChartButton.addEventListener('click', getChartData);



}















