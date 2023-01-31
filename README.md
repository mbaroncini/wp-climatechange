=== Wordpress Greencharts ===
Contributors: mbaroncini
Tags: chartjs, charts, green
Requires at least: 4.7
Tested up to: 6.1.1
Stable tag: 1
Requires PHP: 7.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Another WordPress plugin with charts but with love for the earth in mind

== Description ==

This Wordpress plugin allows you to easily add interactive charts to your website, using data from the global-warming.org API and the ChartJs library. The plugin has built-in mechanisms such as server cache, lazy load and client cache, which work together to reduce the CO2 emissions caused by internet/hardware usage per chart view.

== Screenshots ==

1. The button viewed before chart load
2. The zoomed CO2 chart
3. The entire CO2 chart
4. The ocean warming chart
5. The methane levels chart
6. The temperature chart

== Changelog ==

= 0.1 =
The first beta version

== Installation ==

- Download the plugin from the Wordpress plugin repository.
- Upload the plugin to your website and activate it.

== Usage ==

Once the plugin is installed and configured, you can add chart shortcodes to your pages and posts. The available shortcodes are:

- `[greencharts-chart type="temperature"]`: Displays a line chart of global temperature change over time.
- `[greencharts-chart type="co2"]`: Displays a line chart of CO2 emissions by country.
- `[greencharts-chart type="methane"]`: Displays a line chart of global methane gas emissions.
- `[greencharts-chart type="oceanwarming"]`: Displays a line chart of global ocean warming.

You can customize the appearance of the charts using the ChartJs library's options and callbacks using wordpress js hooks. Visit [ChartJs documentation](https://www.chartjs.org/docs/latest/) for more information.

== Support ==

If you have any issues with the plugin, please open a Github issue or contact us via email. We will do our best to assist you.

== Contribution ==

If you would like to contribute to the development of this plugin, please fork the repository and submit a pull request.

== Disclaimer ==

This plugin is provided "as is" without warranty of any kind, either express or implied. Global warming.org and ChartJs library do not endorse this plugin and are not responsible for any damages or losses that may result from its use.

== Plugin hooks ==

= php [docs](https://developer.wordpress.org/plugins/hooks/)

Use the apply_filters function to set a transient value to false. This will disable caching for the greencharts data.

```php
apply_filters('greencharts_transient_disableCache', false);
```

Use the apply_filters function to set the lifespan of transient. The filter can be used to modify the lifespan of the transient before it is set. The transient is used to cache remote API requests, default transient is 1 month. The lifespan should be the number of seconds, see [$expiration](https://developer.wordpress.org/reference/functions/set_transient/#parameters) parameter of wordpress `set_transient` function

```php
apply_filters('greencharts_transient_lifespan', $this->lifespan, $this);
```

Use the apply_filters function to set a logger value to true. This will enable logging for the greencharts data.

```php
apply_filters('greencharts_logger_shouldLog', defined('WP_DEBUG') && true === WP_DEBUG);
```

Use the apply_filters function to set a verbose value to true. This will enable verbose logging for the greencharts data.

```php
apply_filters('greencharts_logger_shouldBeVerbose', false);
```

Uses the apply_filters function to alter ajax resposes data used by charts. Useful if you need to add more charts.

```php
apply_filters('greencharts_ajax_chartsApi',$charts->getChartsDataByType($type), $type);
```

= js [docs](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-hooks/)

Remember to use `wp.hooks.addFilter` BEFORE greencharts js load.

This code applies a filter to the chartConfig object which is used to create a greencharts_js_chartConfig chart on the canvas. The filter is used to modify the chartConfig object so that it can be used to create a customized chart.

```js
globalHooks.applyFilters("greencharts_js_chartConfig", chartConfig, canvas);
// usage example:
wp.hooks.addFilter(
  "greencharts_js_chartConfig",
  "defaultHooks",
  (chartConfig, canvas) => {
    console.log("THEME FILTER", chartConfig, canvas.dataset.type);
    chartConfig.data.datasets[0].backgroundColor = "blue";
    return chartConfig;
  }
);
```

This code applies a filter to the debug var that control operations logging. The filter is set to false, meaning that any code related to greencharts_js_debug will not be logged in the browser js console.

```js
globalHooks.applyFilters("greencharts_js_debug", false),
  // usage example:
  wp.hooks.addFilter("greencharts_js_debug", "defaultHooks", () => true);
```

This code applies a filter to the "greencharts_js_errorMessage" string. The filter takes in the string, along with the data and error objects, and returns a modified version of the string. This is useful for customizing error messages based on different scenarios.

```js
globalHooks.applyFilters(
  "greencharts_js_errorMessage",
  "Something goes wrong during chart loading. Please retry later",
  data,
  error
);
```

This code applies a filter to the text of a "Reset zoom" button on a canvas element. This allows developers to customize the text of the button.

```js
options.globalHooks.applyFilters(
  "greencharts_js_resetZoomButtonText",
  "Reset zoom",
  canvas
);
```

This code applies a filter to the text of a "Load chart" button on a canvas element. This allows developers to customize the text of the button.

```js
options.globalHooks.applyFilters(
  "greencharts_js_loadButtonText",
  "Load chart",
  canvas
);
```
