
//DEFAULT CHART CONFIG
const defaultDatasetConfig = {
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
const defaultZoomConfig: any = {
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

type co2Object = {
  date: { date: string },
  cycle: string,
  trend: string
}
export const co2Config = (jsonData: [co2Object]): object => {


  //DATA
  let trends = [];
  let cycles = [];
  let labels = []
  let el;
  for (let i in jsonData) {
    el = jsonData[i]
    labels.push(new Date(el.date.date).toLocaleDateString())
    cycles.push(el.cycle)
    trends.push(el.trend)
  }




  const chartData = {
    labels: labels,
    datasets: [
      {
        ...defaultDatasetConfig,
        label: 'Trend',
        data: trends,
        backgroundColor: 'black',
        borderColor: 'black'
      },
      {
        ...defaultDatasetConfig,
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
        zoom: defaultZoomConfig,
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
            text: 'Part per million (ppm)'
          }
        }
      }
    },
  };

  return config
}


type temperatureObject = {
  date: { date: string },
  temperature: string
}
/**
 * Temperature chart config
 * @param {*} jsonData
 * @returns object - chartjs config
 */
export const temperatureConfig = (jsonData: [temperatureObject]): object => {

  //DATA
  let temperature = [];
  let labels = [];
  let el;
  for (let i in jsonData) {
    el = jsonData[i]
    labels.push(new Date(el.date.date).toLocaleDateString())
    temperature.push(el.temperature)
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        ...defaultDatasetConfig,
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
        zoom: defaultZoomConfig,
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
            text: 'Celsius'
          }
        }
      }
    },
  };

  return config
}






/**
 * METHANE chart config
 * @param {*} jsonData
 * @returns object - chartjs config
 */

type methaneObject = {
  date: { date: string },
  trend: string,
  average: string
}
export const methaneConfig = (jsonData: [methaneObject]): object => {


  //DATA
  let trends = [];
  let averages = [];
  let labels = []
  let el;
  for (let i in jsonData) {
    el = jsonData[i]
    labels.push(new Date(el.date.date).toLocaleDateString())
    averages.push(el.average)
    trends.push(el.trend)
  }




  const chartData = {
    labels: labels,
    datasets: [
      {
        ...defaultDatasetConfig,
        label: 'Trend',
        data: trends,
        backgroundColor: 'black',
        borderColor: 'black'
      },
      {
        ...defaultDatasetConfig,
        label: 'Average',
        data: averages,
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
        zoom: defaultZoomConfig,
        title: {
          display: true,
          text: 'Methane levels'
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'Part per million (ppm)'
          }
        }
      }
    },
  };

  return config
}




type oceanWarmingObject = {
  year: { date: string },
  temperature: string
}
/**
 * oceanWarming chart config
 * @param {*} jsonData
 * @returns object - chartjs config
 */
export const oceanwarmingConfig = (jsonData: [oceanWarmingObject]): object => {

  //DATA
  let temperature = [];
  let labels = [];
  let el;
  for (let i in jsonData) {
    el = jsonData[i]
    labels.push(el.year)
    temperature.push(el.temperature)
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        ...defaultDatasetConfig,
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
        zoom: defaultZoomConfig,
        title: {
          display: true,
          text: 'Ocean warming'
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'Celsius'
          }
        }
      }
    },
  };

  return config
}
