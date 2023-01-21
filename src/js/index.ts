

import appConfig from './store'
import { loadChart } from './chartLoader';
import log from './logger'


// const globalHooks = createHooks();



// log('WORDPRESS JS HOOKS', globalHooks)
log('APP CONFIG', appConfig)

const canvas = document.querySelectorAll(appConfig.canvasSelector);
log('CANVAS', appConfig.canvasSelector, canvas)

document.querySelectorAll(appConfig.canvasSelector).forEach((canvas: HTMLCanvasElement, index: number) => {
  loadChart(canvas)
})
