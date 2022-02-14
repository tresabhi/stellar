import { useThree } from '@react-three/fiber';
import { OrthographicCamera } from 'three';
import inverseLerp from 'utilities/inverseLerp';

const MIN_ZOOM = 2.2;

// BUG: pressing shift and selecting parts causes the sensitivity to go up

const CanvasControls = () => {
  const canvas = useThree((state) => state.gl.domElement);
  const camera = useThree((state) => state.camera) as OrthographicCamera;
  const viewport = useThree((state) => state.viewport);

  canvas.addEventListener('wheel', (event) => {
    if (event.ctrlKey) {
      event.preventDefault();

      const maxZoom = camera.right - camera.left;
      const zoomCompensatedDeltaY =
        event.deltaY * inverseLerp(0, maxZoom, camera.zoom);
      const zoom = Math.max(
        MIN_ZOOM,
        Math.min(maxZoom, camera.zoom - zoomCompensatedDeltaY),
      );

      camera.zoom = zoom;
      camera.updateProjectionMatrix();
    } else {
      const pixelToWorldUnitRatio =
        viewport.width / canvas.getBoundingClientRect().width;

      camera.position.x += (event.deltaX * pixelToWorldUnitRatio) / camera.zoom;
      camera.position.y -= (event.deltaY * pixelToWorldUnitRatio) / camera.zoom;
    }
  });

  return null;
};

export default CanvasControls;
