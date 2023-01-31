
import { _Hooks } from '@wordpress/hooks/build-types/createHooks';


type Options = {
  debug: boolean,
  canvasSelector: string,
  ajaxAction: string,
  ajaxUrl: string,
  globalHooks: _Hooks
}

const appConfig: Options = {
  canvasSelector: 'canvas.climatechange-chart',
  ajaxAction: 'climatechange_charts_api',
  debug: false,
  globalHooks: window.wp.hooks,
  ajaxUrl: window.climatechange.ajaxurl
}

appConfig.debug = Boolean(appConfig.globalHooks.applyFilters('climatechange_js_debug', false))


export default appConfig;
