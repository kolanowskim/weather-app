import * as THREE from "three";
import mapOptions from "./mapOptions";

export function initWebGLOverlayView(map, google) {
  let scene, renderer, camera;

  const webglOverlayView = new google.maps.WebGLOverlayView();

  webglOverlayView.onAdd = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera();
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
    directionalLight.position.set(0.5, -1, 0.5);
    scene.add(directionalLight);
  };
  webglOverlayView.onContextRestored = ({ gl }) => {
    renderer = new THREE.WebGLRenderer({
      canvas: gl.canvas,
      context: gl,
      ...gl.getContextAttributes(),
    });

    renderer.autoClear = false;

    renderer.setAnimationLoop(() => {
      map.moveCamera({
        tilt: mapOptions.tilt,
        heading: mapOptions.heading,
        zoom: mapOptions.zoom,
      });

      if (mapOptions.heading <= 360) {
        mapOptions.heading += 0.2;
      } else {
        mapOptions.heading = 0;
      }
    });
  };
  webglOverlayView.onDraw = () => {};
  webglOverlayView.setMap(map);
}
