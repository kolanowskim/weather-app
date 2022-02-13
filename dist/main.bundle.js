/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./functions/autoComplete.js":
/*!***********************************!*\
  !*** ./functions/autoComplete.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"autoComplete\": () => (/* binding */ autoComplete)\n/* harmony export */ });\n/* harmony import */ var _fetchAllData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetchAllData */ \"./functions/fetchAllData.js\");\n\r\n\r\nfunction autoComplete(map, google) {\r\n  const input = document.getElementById(\"searchBar-input\");\r\n  const options = {\r\n    fields: [\"formatted_address\", \"geometry\", \"name\"],\r\n    strictBounds: false,\r\n    types: [\"(cities)\"],\r\n  };\r\n\r\n  const autocomplete = new google.maps.places.Autocomplete(input, options);\r\n\r\n  // Bind the map's bounds (viewport) property to the autocomplete object,\r\n  // so that the autocomplete requests use the current map bounds for the\r\n  // bounds option in the request.\r\n  autocomplete.bindTo(\"bounds\", map);\r\n\r\n  autocomplete.addListener(\"place_changed\", () => {\r\n    const place = autocomplete.getPlace();\r\n    if (!place.geometry || !place.geometry.location) {\r\n      // User entered the name of a Place that was not suggested and\r\n      // pressed the Enter key, or the Place Details request failed.\r\n      window.alert(\"No details available for input: '\" + place.name + \"'\");\r\n      return;\r\n    }\r\n    const lat = place.geometry.location.lat();\r\n    const lng = place.geometry.location.lng();\r\n    const name = place.name;\r\n\r\n    // If the place has a location, then present it on a map.\r\n    if (place.geometry.location) {\r\n      map.setCenter(place.geometry.location);\r\n      (0,_fetchAllData__WEBPACK_IMPORTED_MODULE_0__.fetchAllData)(lat, lng, name);\r\n    } else {\r\n      map.fitBounds(place.geometry.viewport);\r\n      (0,_fetchAllData__WEBPACK_IMPORTED_MODULE_0__.fetchAllData)(lat, lng, name);\r\n    }\r\n  });\r\n}\r\n\n\n//# sourceURL=webpack://js-weather-app/./functions/autoComplete.js?");

/***/ }),

/***/ "./functions/fetchAllData.js":
/*!***********************************!*\
  !*** ./functions/fetchAllData.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchAllData\": () => (/* binding */ fetchAllData)\n/* harmony export */ });\nfunction fetchAllData(lat, lng, name) {\r\n  setCurrentCityName(name);\r\n\r\n  fetch(\r\n    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${\"f4527d52735fb0f3b0aee58dd028ff3b\"}`\r\n  )\r\n    .then((response) => response.json())\r\n    .then((data) => {\r\n      setCurrentWeather(data);\r\n    })\r\n    .catch((e) => console.log(e));\r\n\r\n  fetch(\r\n    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${\"f4527d52735fb0f3b0aee58dd028ff3b\"}`\r\n  )\r\n    .then((response) => response.json())\r\n    .then((data) => {\r\n      setAQI(data);\r\n    })\r\n    .catch((e) => console.log(e));\r\n\r\n  fetch(\r\n    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly&units=metric&appid=${\"f4527d52735fb0f3b0aee58dd028ff3b\"}`\r\n  )\r\n    .then((response) => response.json())\r\n    .then((data) => {\r\n      createForecast(data);\r\n    })\r\n    .catch((e) => console.log(e));\r\n}\r\n\r\nfunction createForecast(data) {\r\n  const forecast = document.getElementById(\"forecast\");\r\n  forecast.textContent = \"\";\r\n\r\n  data.daily.forEach((value, index) => {\r\n    let dayName;\r\n    if (index == 0) {\r\n      dayName = \"Today\";\r\n    } else {\r\n      dayName = new Date(value.dt * 1000).toLocaleDateString(\"en\", {\r\n        weekday: \"long\",\r\n      });\r\n    }\r\n\r\n    const icon = value.weather[0].icon;\r\n    const tempMin = Math.round(value.temp.min) + String.fromCharCode(176);\r\n    const tempMax = Math.round(value.temp.max) + String.fromCharCode(176);\r\n\r\n    const templateString = `<div class=\"forecast-day\">\r\n          <p>${dayName}</p>\r\n          <img src=\"http://openweathermap.org/img/wn/${icon}@2x.png\"/>\r\n          <p class=\"forecast-day-temp\">${tempMax} / ${tempMin}</p>\r\n      </div>`;\r\n    forecast.insertAdjacentHTML(\"beforeend\", templateString);\r\n  });\r\n}\r\n\r\nfunction setCurrentCityName(name) {\r\n  const title = document.getElementById(\"title\");\r\n  title.textContent = name;\r\n}\r\n\r\nfunction setCurrentWeather(data) {\r\n  const temperature = document.getElementById(\"weather-temperature\");\r\n  const icon = document.getElementById(\"weather-icon\");\r\n  const description = document.getElementById(\"weather-description\");\r\n\r\n  temperature.textContent =\r\n    Math.round(data.main.temp) + String.fromCharCode(176);\r\n  icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;\r\n  description.textContent = data.weather[0].description;\r\n}\r\n\r\nfunction setAQI(data) {\r\n  const aqi = document.getElementById(\"weather-aqi\");\r\n  aqi.textContent = \"AQI:  \" + checkAirQuality(data.list[0].main.aqi);\r\n}\r\n\r\nfunction checkAirQuality(index) {\r\n  switch (index) {\r\n    case 1:\r\n      return \"Good\";\r\n    case 2:\r\n      return \"Fair\";\r\n    case 3:\r\n      return \"Moderate\";\r\n    case 4:\r\n      return \"Poor\";\r\n    case 5:\r\n      return \"Very Poor\";\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://js-weather-app/./functions/fetchAllData.js?");

/***/ }),

/***/ "./functions/initMap.js":
/*!******************************!*\
  !*** ./functions/initMap.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initMap\": () => (/* binding */ initMap)\n/* harmony export */ });\n/* harmony import */ var _mapOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mapOptions */ \"./functions/mapOptions.js\");\n/* harmony import */ var _initWebGLOverlayView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initWebGLOverlayView */ \"./functions/initWebGLOverlayView.js\");\n/* harmony import */ var _autoComplete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./autoComplete */ \"./functions/autoComplete.js\");\n/* harmony import */ var _fetchAllData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fetchAllData */ \"./functions/fetchAllData.js\");\n\r\n\r\n\r\n\r\n\r\nfunction initMap(google) {\r\n  const mapDiv = document.getElementById(\"map\");\r\n\r\n  const map = new google.maps.Map(mapDiv, _mapOptions__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n  (0,_initWebGLOverlayView__WEBPACK_IMPORTED_MODULE_1__.initWebGLOverlayView)(map, google);\r\n  (0,_autoComplete__WEBPACK_IMPORTED_MODULE_2__.autoComplete)(map, google);\r\n  (0,_fetchAllData__WEBPACK_IMPORTED_MODULE_3__.fetchAllData)(_mapOptions__WEBPACK_IMPORTED_MODULE_0__[\"default\"].center.lat, _mapOptions__WEBPACK_IMPORTED_MODULE_0__[\"default\"].center.lng, _mapOptions__WEBPACK_IMPORTED_MODULE_0__[\"default\"].name);\r\n}\r\n\n\n//# sourceURL=webpack://js-weather-app/./functions/initMap.js?");

/***/ }),

/***/ "./functions/initWebGLOverlayView.js":
/*!*******************************************!*\
  !*** ./functions/initWebGLOverlayView.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initWebGLOverlayView\": () => (/* binding */ initWebGLOverlayView)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _mapOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mapOptions */ \"./functions/mapOptions.js\");\n\r\n\r\n\r\nfunction initWebGLOverlayView(map, google) {\r\n  let scene, renderer, camera;\r\n\r\n  const webglOverlayView = new google.maps.WebGLOverlayView();\r\n\r\n  webglOverlayView.onAdd = () => {\r\n    scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();\r\n    camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera();\r\n    const ambientLight = new three__WEBPACK_IMPORTED_MODULE_1__.AmbientLight(0xffffff, 0.75);\r\n    scene.add(ambientLight);\r\n    const directionalLight = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(0xffffff, 0.25);\r\n    directionalLight.position.set(0.5, -1, 0.5);\r\n    scene.add(directionalLight);\r\n  };\r\n  webglOverlayView.onContextRestored = ({ gl }) => {\r\n    renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer({\r\n      canvas: gl.canvas,\r\n      context: gl,\r\n      ...gl.getContextAttributes(),\r\n    });\r\n\r\n    renderer.autoClear = false;\r\n\r\n    renderer.setAnimationLoop(() => {\r\n      map.moveCamera({\r\n        tilt: _mapOptions__WEBPACK_IMPORTED_MODULE_0__[\"default\"].tilt,\r\n        heading: _mapOptions__WEBPACK_IMPORTED_MODULE_0__[\"default\"].heading,\r\n        zoom: _mapOptions__WEBPACK_IMPORTED_MODULE_0__[\"default\"].zoom,\r\n      });\r\n\r\n      if (_mapOptions__WEBPACK_IMPORTED_MODULE_0__[\"default\"].heading <= 360) {\r\n        _mapOptions__WEBPACK_IMPORTED_MODULE_0__[\"default\"].heading += 0.2;\r\n      } else {\r\n        _mapOptions__WEBPACK_IMPORTED_MODULE_0__[\"default\"].heading = 0;\r\n      }\r\n    });\r\n  };\r\n  webglOverlayView.onDraw = () => {};\r\n  webglOverlayView.setMap(map);\r\n}\r\n\n\n//# sourceURL=webpack://js-weather-app/./functions/initWebGLOverlayView.js?");

/***/ }),

/***/ "./functions/mapOptions.js":
/*!*********************************!*\
  !*** ./functions/mapOptions.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n  tilt: 67.5,\r\n  heading: 0,\r\n  zoom: 17,\r\n  name: \"Warszawa\",\r\n  center: { lat: 52.237049, lng: 21.017532 },\r\n  mapId: \"15431d2b469f209e\",\r\n  disableDefaultUI: true,\r\n  gestureHandling: \"none\",\r\n  keyboardShortcuts: false,\r\n  featureType: \"poi\",\r\n  stylers: [{ visibility: \"off\" }],\r\n});\r\n\n\n//# sourceURL=webpack://js-weather-app/./functions/mapOptions.js?");

/***/ }),

/***/ "./node_modules/@googlemaps/js-api-loader/dist/index.esm.js":
/*!******************************************************************!*\
  !*** ./node_modules/@googlemaps/js-api-loader/dist/index.esm.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DEFAULT_ID\": () => (/* binding */ DEFAULT_ID),\n/* harmony export */   \"Loader\": () => (/* binding */ Loader),\n/* harmony export */   \"LoaderStatus\": () => (/* binding */ LoaderStatus)\n/* harmony export */ });\n// do not edit .js files directly - edit src/index.jst\n\n\n\nvar fastDeepEqual = function equal(a, b) {\n  if (a === b) return true;\n\n  if (a && b && typeof a == 'object' && typeof b == 'object') {\n    if (a.constructor !== b.constructor) return false;\n\n    var length, i, keys;\n    if (Array.isArray(a)) {\n      length = a.length;\n      if (length != b.length) return false;\n      for (i = length; i-- !== 0;)\n        if (!equal(a[i], b[i])) return false;\n      return true;\n    }\n\n\n\n    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;\n    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();\n    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();\n\n    keys = Object.keys(a);\n    length = keys.length;\n    if (length !== Object.keys(b).length) return false;\n\n    for (i = length; i-- !== 0;)\n      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;\n\n    for (i = length; i-- !== 0;) {\n      var key = keys[i];\n\n      if (!equal(a[key], b[key])) return false;\n    }\n\n    return true;\n  }\n\n  // true if both NaN, false otherwise\n  return a!==a && b!==b;\n};\n\n/**\n * Copyright 2019 Google LLC. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at.\n *\n *      Http://www.apache.org/licenses/LICENSE-2.0.\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\nconst DEFAULT_ID = \"__googleMapsScriptId\";\n/**\n * The status of the [[Loader]].\n */\nvar LoaderStatus;\n(function (LoaderStatus) {\n    LoaderStatus[LoaderStatus[\"INITIALIZED\"] = 0] = \"INITIALIZED\";\n    LoaderStatus[LoaderStatus[\"LOADING\"] = 1] = \"LOADING\";\n    LoaderStatus[LoaderStatus[\"SUCCESS\"] = 2] = \"SUCCESS\";\n    LoaderStatus[LoaderStatus[\"FAILURE\"] = 3] = \"FAILURE\";\n})(LoaderStatus || (LoaderStatus = {}));\n/**\n * [[Loader]] makes it easier to add Google Maps JavaScript API to your application\n * dynamically using\n * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).\n * It works by dynamically creating and appending a script node to the the\n * document head and wrapping the callback function so as to return a promise.\n *\n * ```\n * const loader = new Loader({\n *   apiKey: \"\",\n *   version: \"weekly\",\n *   libraries: [\"places\"]\n * });\n *\n * loader.load().then((google) => {\n *   const map = new google.maps.Map(...)\n * })\n * ```\n */\nclass Loader {\n    /**\n     * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set\n     * using this library, instead the defaults are set by the Google Maps\n     * JavaScript API server.\n     *\n     * ```\n     * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});\n     * ```\n     */\n    constructor({ apiKey, channel, client, id = DEFAULT_ID, libraries = [], language, region, version, mapIds, nonce, retries = 3, url = \"https://maps.googleapis.com/maps/api/js\", }) {\n        this.CALLBACK = \"__googleMapsCallback\";\n        this.callbacks = [];\n        this.done = false;\n        this.loading = false;\n        this.errors = [];\n        this.version = version;\n        this.apiKey = apiKey;\n        this.channel = channel;\n        this.client = client;\n        this.id = id || DEFAULT_ID; // Do not allow empty string\n        this.libraries = libraries;\n        this.language = language;\n        this.region = region;\n        this.mapIds = mapIds;\n        this.nonce = nonce;\n        this.retries = retries;\n        this.url = url;\n        if (Loader.instance) {\n            if (!fastDeepEqual(this.options, Loader.instance.options)) {\n                throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);\n            }\n            return Loader.instance;\n        }\n        Loader.instance = this;\n    }\n    get options() {\n        return {\n            version: this.version,\n            apiKey: this.apiKey,\n            channel: this.channel,\n            client: this.client,\n            id: this.id,\n            libraries: this.libraries,\n            language: this.language,\n            region: this.region,\n            mapIds: this.mapIds,\n            nonce: this.nonce,\n            url: this.url,\n        };\n    }\n    get status() {\n        if (this.errors.length) {\n            return LoaderStatus.FAILURE;\n        }\n        if (this.done) {\n            return LoaderStatus.SUCCESS;\n        }\n        if (this.loading) {\n            return LoaderStatus.LOADING;\n        }\n        return LoaderStatus.INITIALIZED;\n    }\n    get failed() {\n        return this.done && !this.loading && this.errors.length >= this.retries + 1;\n    }\n    /**\n     * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].\n     *\n     * @ignore\n     */\n    createUrl() {\n        let url = this.url;\n        url += `?callback=${this.CALLBACK}`;\n        if (this.apiKey) {\n            url += `&key=${this.apiKey}`;\n        }\n        if (this.channel) {\n            url += `&channel=${this.channel}`;\n        }\n        if (this.client) {\n            url += `&client=${this.client}`;\n        }\n        if (this.libraries.length > 0) {\n            url += `&libraries=${this.libraries.join(\",\")}`;\n        }\n        if (this.language) {\n            url += `&language=${this.language}`;\n        }\n        if (this.region) {\n            url += `&region=${this.region}`;\n        }\n        if (this.version) {\n            url += `&v=${this.version}`;\n        }\n        if (this.mapIds) {\n            url += `&map_ids=${this.mapIds.join(\",\")}`;\n        }\n        return url;\n    }\n    deleteScript() {\n        const script = document.getElementById(this.id);\n        if (script) {\n            script.remove();\n        }\n    }\n    /**\n     * Load the Google Maps JavaScript API script and return a Promise.\n     */\n    load() {\n        return this.loadPromise();\n    }\n    /**\n     * Load the Google Maps JavaScript API script and return a Promise.\n     *\n     * @ignore\n     */\n    loadPromise() {\n        return new Promise((resolve, reject) => {\n            this.loadCallback((err) => {\n                if (!err) {\n                    resolve(window.google);\n                }\n                else {\n                    reject(err.error);\n                }\n            });\n        });\n    }\n    /**\n     * Load the Google Maps JavaScript API script with a callback.\n     */\n    loadCallback(fn) {\n        this.callbacks.push(fn);\n        this.execute();\n    }\n    /**\n     * Set the script on document.\n     */\n    setScript() {\n        if (document.getElementById(this.id)) {\n            // TODO wrap onerror callback for cases where the script was loaded elsewhere\n            this.callback();\n            return;\n        }\n        const url = this.createUrl();\n        const script = document.createElement(\"script\");\n        script.id = this.id;\n        script.type = \"text/javascript\";\n        script.src = url;\n        script.onerror = this.loadErrorCallback.bind(this);\n        script.defer = true;\n        script.async = true;\n        if (this.nonce) {\n            script.nonce = this.nonce;\n        }\n        document.head.appendChild(script);\n    }\n    /**\n     * Reset the loader state.\n     */\n    reset() {\n        this.deleteScript();\n        this.done = false;\n        this.loading = false;\n        this.errors = [];\n        this.onerrorEvent = null;\n    }\n    resetIfRetryingFailed() {\n        if (this.failed) {\n            this.reset();\n        }\n    }\n    loadErrorCallback(e) {\n        this.errors.push(e);\n        if (this.errors.length <= this.retries) {\n            const delay = this.errors.length * Math.pow(2, this.errors.length);\n            console.log(`Failed to load Google Maps script, retrying in ${delay} ms.`);\n            setTimeout(() => {\n                this.deleteScript();\n                this.setScript();\n            }, delay);\n        }\n        else {\n            this.onerrorEvent = e;\n            this.callback();\n        }\n    }\n    setCallback() {\n        window.__googleMapsCallback = this.callback.bind(this);\n    }\n    callback() {\n        this.done = true;\n        this.loading = false;\n        this.callbacks.forEach((cb) => {\n            cb(this.onerrorEvent);\n        });\n        this.callbacks = [];\n    }\n    execute() {\n        this.resetIfRetryingFailed();\n        if (this.done) {\n            this.callback();\n        }\n        else {\n            // short circuit and warn if google.maps is already loaded\n            if (window.google && window.google.maps && window.google.maps.version) {\n                console.warn(\"Google Maps already loaded outside @googlemaps/js-api-loader.\" +\n                    \"This may result in undesirable behavior as options and script parameters may not match.\");\n                this.callback();\n                return;\n            }\n            if (this.loading) ;\n            else {\n                this.loading = true;\n                this.setCallback();\n                this.setScript();\n            }\n        }\n    }\n}\n\n\n//# sourceMappingURL=index.esm.js.map\n\n\n//# sourceURL=webpack://js-weather-app/./node_modules/@googlemaps/js-api-loader/dist/index.esm.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./styles/index.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./styles/index.css ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"html,\\r\\nbody {\\r\\n  margin: 0;\\r\\n  padding: 0;\\r\\n  font-family: Roboto;\\r\\n}\\r\\n\\r\\n#map{\\r\\n    height: 100vh;\\r\\n    width: 100vw;\\r\\n}\\r\\n\\r\\n.container {\\r\\n  position: fixed;\\r\\n  z-index: 999;\\r\\n  display: flex;\\r\\n  flex-direction: column;\\r\\n  color: black;\\r\\n  align-items: center;\\r\\n  justify-content: center;\\r\\n  width: 100vw;\\r\\n  height: 100vh;\\r\\n}\\r\\n\\r\\n.wrapper{\\r\\n  display: flex;\\r\\n  flex-direction: column;\\r\\n  align-items: center;\\r\\n  justify-content: center;\\r\\n  margin-bottom: 15px;\\r\\n}\\r\\n\\r\\n.weather{\\r\\n  display: flex;\\r\\n  justify-content: space-between;\\r\\n  align-items: flex-end;\\r\\n  width: 100vw;\\r\\n}\\r\\n\\r\\n.weather-box{\\r\\n  margin-left: 10px;\\r\\n}\\r\\n\\r\\n\\r\\n#title {\\r\\n  margin-top: 0;\\r\\n}\\r\\n\\r\\n\\r\\n#weather-description{\\r\\n  text-align: center;\\r\\n}\\r\\n\\r\\n\\r\\n#weather-temperature{\\r\\n  font-size: 30px;\\r\\n  margin-bottom: 0;\\r\\n}\\r\\n\\r\\n.searchBar-container{\\r\\n  background-color: rgba(73,80,87,0.5);\\r\\n  padding: 5px 11px 5px 7px;\\r\\n  border-radius: 20px;\\r\\n  width: 50%;\\r\\n  text-align: center;\\r\\n  margin: 30px 0 20px 0;\\r\\n  \\r\\n}\\r\\n\\r\\n#searchBar-input {\\r\\n  background-color: white;\\r\\n  border: none;\\r\\n  border-radius: 20px;\\r\\n  width: 100%;\\r\\n  text-align: center;\\r\\n  font-size: 15px;\\r\\n  padding: 2px 0 2px 5px;\\r\\n}\\r\\ninput[type=\\\"text\\\" i] {\\r\\n  padding: 0;\\r\\n}\\r\\n\\r\\n.forecast{\\r\\n  width: 100%;\\r\\n}\\r\\n\\r\\n.forecast-day{\\r\\n  background-color: rgba(73,80,87,0.5);\\r\\n  display: grid;\\r\\n  grid-template-columns: 3fr 1fr 80px;\\r\\n  align-items: center;\\r\\n  border-radius: 10px;\\r\\n  margin: 7px 7px 0 7px;\\r\\n}\\r\\n\\r\\n.forecast-day p {\\r\\n  margin-left: 15px;\\r\\n  font-weight: 500;\\r\\n}\\r\\n\\r\\n.forecast img {\\r\\n  background-color: rgb(206, 212, 218);\\r\\n  width: 40px;\\r\\n  height: 40px;\\r\\n  border-radius: 10px;\\r\\n} \\r\\n\\r\\n@media screen and (min-width: 320px) and  (max-width: 480px) {\\r\\n  \\r\\n}\\r\\n\\r\\n@media screen and (min-width: 481px) and  (max-width: 768px) {\\r\\n  \\r\\n  .weather{\\r\\n    min-width: 500px;\\r\\n    max-width: 500px;\\r\\n  }\\r\\n\\r\\n}\\r\\n\\r\\n@media screen and (min-width: 769px) and  (max-width: 1024px) {\\r\\n\\r\\n  .weather{\\r\\n    min-width: 500px;\\r\\n    max-width: 500px;\\r\\n  }\\r\\n  \\r\\n}\\r\\n@media screen and (min-width: 1025px) and  (max-width: 1200px) {\\r\\n\\r\\n  .wrapper{\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    align-items: center;\\r\\n    justify-content: center;\\r\\n  }\\r\\n  .weather{\\r\\n    display: flex;\\r\\n    justify-content: space-between;\\r\\n    min-width: 500px;\\r\\n    max-width: 500px;\\r\\n  }\\r\\n\\r\\n  .weather-box{\\r\\n    margin-left: 10px;\\r\\n  }\\r\\n  \\r\\n\\r\\n  #title {\\r\\n    margin-top: 0;\\r\\n  }\\r\\n\\r\\n  \\r\\n  #weather-description{\\r\\n    text-align: center;\\r\\n    margin-top: 0;\\r\\n  }\\r\\n  \\r\\n  \\r\\n  #weather-temperature{\\r\\n    font-size: 30px;\\r\\n    margin-bottom: 0;\\r\\n  }\\r\\n\\r\\n  .searchBar-container{\\r\\n    background-color: rgba(73,80,87,0.7);\\r\\n    padding: 5px 7px 5px 7px;\\r\\n    border-radius: 20px;\\r\\n    min-width: 500px;\\r\\n    max-width: 500px;\\r\\n    text-align: center;\\r\\n    margin: 30px 0 20px 0;\\r\\n    \\r\\n  }\\r\\n  \\r\\n  #searchBar-input {\\r\\n    background-color: white;\\r\\n    border: none;\\r\\n    border-radius: 20px;\\r\\n    width: 100%;\\r\\n    text-align: center;\\r\\n    font-size: 15px;\\r\\n    padding: 2px 0 2px 0;\\r\\n  }\\r\\n\\r\\n  .forecast{\\r\\n    color: white;\\r\\n    display: flex;\\r\\n    justify-content: space-between;\\r\\n  }\\r\\n  \\r\\n  .forecast-day{\\r\\n    background-color: rgba(73,80,87,0.7);\\r\\n    margin: 50px 10px 0 10px;\\r\\n    border-radius: 20px;\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    align-items: center;\\r\\n    padding: 10px;\\r\\n  }\\r\\n\\r\\n  .forecast-day p {\\r\\n    font-size: 15px;\\r\\n    margin-left: 0;\\r\\n  }\\r\\n  \\r\\n  .forecast img {\\r\\n    background-color: rgb(206, 212, 218);\\r\\n    border-radius: 20px;\\r\\n    width: 80px;\\r\\n    height: 80px;\\r\\n  }\\r\\n\\r\\n}\\r\\n@media screen and (min-width: 1201px){\\r\\n\\r\\n  .wrapper{\\r\\n    max-width: 1100px;\\r\\n    min-width: 1100px;\\r\\n  }\\r\\n  .weather{\\r\\n    display: flex;\\r\\n    justify-content: space-between;\\r\\n    min-width: 550px;\\r\\n    max-width: 550px;\\r\\n  }\\r\\n\\r\\n\\r\\n  .weather-box-2{\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    justify-content: flex-end;\\r\\n  }\\r\\n  \\r\\n\\r\\n  #title {\\r\\n    margin-top: 0;\\r\\n    font-size: 50px;\\r\\n  }\\r\\n\\r\\n  #weather-description{\\r\\n    text-align: center;\\r\\n    font-size: 20px;\\r\\n    margin-top: 0;\\r\\n  }\\r\\n  \\r\\n  #weather-aqi{\\r\\n    font-size: 20px;\\r\\n  }\\r\\n  \\r\\n  #weather-temperature{\\r\\n    font-size: 40px;\\r\\n    margin-bottom: 0;\\r\\n  }\\r\\n\\r\\n  .searchBar-container{\\r\\n    background-color: rgba(73,80,87,0.7);\\r\\n    padding: 5px 7px 5px 7px;\\r\\n    border-radius: 20px;\\r\\n    min-width: 550px;\\r\\n    max-width: 550px;\\r\\n    text-align: center;\\r\\n    margin: 30px 0 20px 0;\\r\\n    \\r\\n  }\\r\\n  \\r\\n  #searchBar-input {\\r\\n    background-color: white;\\r\\n    border: none;\\r\\n    border-radius: 20px;\\r\\n    width: 100%;\\r\\n    text-align: center;\\r\\n    font-size: 20px;\\r\\n    padding: 2px 0 2px 0;\\r\\n  }\\r\\n\\r\\n  .forecast{\\r\\n    color: white;\\r\\n    display: flex;\\r\\n    justify-content: space-between;\\r\\n  }\\r\\n  \\r\\n  .forecast-day{\\r\\n    background-color: rgba(73,80,87,0.7);\\r\\n    margin: 50px 10px 0 10px;\\r\\n    border-radius: 20px;\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    align-items: center;\\r\\n    padding: 10px;\\r\\n  }\\r\\n  \\r\\n  .forecast-day p {\\r\\n    font-size: 15px;\\r\\n    text-align: center;\\r\\n    margin-left: 0;\\r\\n  }\\r\\n  \\r\\n  .forecast img {\\r\\n    background-color: rgb(206, 212, 218);\\r\\n    border-radius: 20px;\\r\\n    width: 100%;\\r\\n    height: 100%;\\r\\n  }\\r\\n  \\r\\n}\\r\\n\\r\\n\\r\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://js-weather-app/./styles/index.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://js-weather-app/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://js-weather-app/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./styles/index.css":
/*!**************************!*\
  !*** ./styles/index.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./index.css */ \"./node_modules/css-loader/dist/cjs.js!./styles/index.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://js-weather-app/./styles/index.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://js-weather-app/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://js-weather-app/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://js-weather-app/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://js-weather-app/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://js-weather-app/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://js-weather-app/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @googlemaps/js-api-loader */ \"./node_modules/@googlemaps/js-api-loader/dist/index.esm.js\");\n/* harmony import */ var _functions_initMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../functions/initMap */ \"./functions/initMap.js\");\n/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/index.css */ \"./styles/index.css\");\n\r\n\r\n\r\n\r\nconst loader = new _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_0__.Loader({\r\n  apiKey: \"AIzaSyDHIRLkRSyS6J0nvhJC26X9IoRnk7ubARA\",\r\n  version: \"beta\",\r\n  libraries: [\"places\"],\r\n});\r\n\r\nloader\r\n  .load()\r\n  .then((google) => {\r\n    (0,_functions_initMap__WEBPACK_IMPORTED_MODULE_1__.initMap)(google);\r\n  })\r\n  .catch((e) => console.log(e));\r\n\n\n//# sourceURL=webpack://js-weather-app/./src/index.js?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;