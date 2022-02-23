import { fetchAllData } from "./fetch-all-data";

export function autoComplete(map, google) {
  const input = document.getElementById("searchBar-input");
  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["(cities)"],
  };

  const autocomplete = new google.maps.places.Autocomplete(input, options);

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo("bounds", map);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const name = place.name;

    // If the place has a location, then present it on a map.
    if (place.geometry.location) {
      map.setCenter(place.geometry.location);
      fetchAllData(lat, lng, name);
      clearInput();
    } else {
      map.fitBounds(place.geometry.viewport);
      fetchAllData(lat, lng, name);
      clearInput();
    }
  });

  function clearInput() {
    input.blur();
    input.value = "";
  }
}
