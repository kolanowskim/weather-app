import mapOptions from "./mapOptions";
import { initWebGLOverlayView } from "./initWebGLOverlayView";
import { autoComplete } from "./autoComplete";
import { fetchAllData } from "./fetchAllData";

export function initMap(google) {
  const mapDiv = document.getElementById("map");

  const map = new google.maps.Map(mapDiv, mapOptions);
  initWebGLOverlayView(map, google);
  autoComplete(map, google);
  fetchAllData(mapOptions.center.lat, mapOptions.center.lng, mapOptions.name);
}
