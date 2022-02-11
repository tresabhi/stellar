import { useThree } from '@react-three/fiber';
import lerpInverse from 'utilities/lerpInverse';

const SCROLL_SENSITIVITY = 0.25;
const MIN_ZOOM = 2.2;
const MAX_ZOOM = 1024;

const CanvasControls = () => {
  const camera = useThree(({ camera }) => camera);
  const canvas = useThree(({ gl }) => gl.domElement);

  canvas.addEventListener('wheel', (event) => {
    if (event.ctrlKey) {
      camera.zoom = Math.max(
        MIN_ZOOM,
        Math.min(
          MAX_ZOOM,
          camera.zoom - event.deltaY * lerpInverse(0, MAX_ZOOM, camera.zoom),
        ),
      );
      camera.updateProjectionMatrix();
    } else {
      camera.position.x += (event.deltaX * SCROLL_SENSITIVITY) / camera.zoom;
      camera.position.y -= (event.deltaY * SCROLL_SENSITIVITY) / camera.zoom;
    }
  });

  return null;
};

export default CanvasControls;
