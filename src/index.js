import { Loader } from "@googlemaps/js-api-loader";
import { initMap } from "../functions/initMap";
import style from "../styles/index.css";

const loader = new Loader({
  apiKey: process.env.GOOGLE_API_KEY,
  version: "beta",
  libraries: ["places"],
});

loader
  .load()
  .then((google) => {
    initMap(google);
  })
  .catch((e) => console.log(e));
