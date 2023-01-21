
window.climatechange.chartsConfig = {};


//DEFAULT CHART CONFIG
window.climatechange.defaultDatasetConfig = {
  fill: false,
  // tension: 0.1,
  // borderColor: 'rgb(75, 192, 192)',
  borderWidth: 1,
  pointBorderWidth: 0,
  pointHoverRadius: 10,
  //pointHoverBackgroundColor: "rgba(75,192,192,1)",
  //pointHoverBorderColor: "rgba(220,220,220,1)",
  pointHoverBorderWidth: 0,
  pointRadius: 0,
  pointHitRadius: 0,
}

//DEFAULT CHARTJS ZOOM PLUGIN CONFIG
window.climatechange.defaultZoomConfig = {
  zoom: {
    wheel: {
      enabled: true,
    },
    pinch: {
      enabled: true
    },
    drag: {
      enabled: true
    },
    mode: 'xy',
  }
}

/**
 * CO2 chart config
 * @param {*} jsonData
 * @returns object - chartjs config
 */
window.climatechange.chartsConfig.co2Config = (jsonData) => {


  //DATA
  let trends = [];
  let cycles = [];
  let labels = []
  let el;
  for (i in jsonData) {
    el = jsonData[i]
    labels.push(new Date(el.date.date).toLocaleDateString())
    cycles.push(el.cycle)
    trends.push(el.trend)
  }




  const chartData = {
    labels: labels,
    datasets: [
      {
        ...window.climatechange.defaultDatasetConfig,
        label: 'Trend',
        data: trends,
        backgroundColor: 'black',
        borderColor: 'black'
      },
      {
        ...window.climatechange.defaultDatasetConfig,
        label: 'Cycle',
        data: cycles,
        backgroundColor: 'red',
        borderColor: 'red'
      }
    ]
  }

  const config = {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        zoom: window.climatechange.defaultZoomConfig,
        title: {
          display: true,
          text: 'Carbon Dioxide levels'
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: function () {
              return 'Part per million (ppm)'
            }
          }
        }
      }
    },
  };

  console.info(config)

  return config
}


/**
 * Temperature chart config
 * @param {*} jsonData
 * @returns object - chartjs config
 */
window.climatechange.chartsConfig.temperatureConfig = (jsonData) => {


  //DATA
  let temperature = [];
  let labels = [];
  let el;
  for (i in jsonData) {
    el = jsonData[i]
    labels.push(new Date(el.date.date).toLocaleDateString())
    temperature.push(el.temperature)
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        ...window.climatechange.defaultDatasetConfig,
        label: 'Temperature',
        data: temperature,
        backgroundColor: 'red',
        borderColor: 'red'
      }
    ]
  }

  const config = {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        zoom: window.climatechange.defaultZoomConfig,
        title: {
          display: true,
          text: 'Temperature'
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: function () {
              return 'Celsius'
            }
          }
        }
      }
    },
  };

  console.info(config)

  return config
}
