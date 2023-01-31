import { _Hooks } from "@wordpress/hooks/build-types/createHooks";
import { Chart } from "chart.js";

export { };

declare global {
  interface Window {
    greencharts: {
      ajaxurl: string,
      chartsConfig: [],
      charts: [Chart],
      test: any,
    },
    wp: {
      hooks: _Hooks
    }
  }
}
