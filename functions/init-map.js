import mapOptions from "./map-options";
import { initWebGLOverlayView } from "./init-webgloverlay-view";
import { autoComplete } from "./auto-complete";
import { fetchAllData } from "./fetch-all-data";

export function initMap(google) {
  const mapDiv = document.getElementById("map");

  const map = new google.maps.Map(mapDiv, mapOptions);
  initWebGLOverlayView(map, google);
  autoComplete(map, google);
  fetchAllData(mapOptions.center.lat, mapOptions.center.lng, mapOptions.name);
}
