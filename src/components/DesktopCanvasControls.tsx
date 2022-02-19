import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { OrthographicCamera } from 'three';
import inverseLerp from 'utilities/inverseLerp';

const MIN_ZOOM = 2.2;

// BUG: pressing shift and selecting parts causes the sensitivity to go up

const DesktopCanvasControls = () => {
  const canvas = useThree((state) => state.gl.domElement);
  const camera = useThree((state) => state.camera as OrthographicCamera);
  const viewport = useThree((state) => state.viewport);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
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
        const moveX = event.deltaX / camera.zoom;
        const moveY = event.deltaY / camera.zoom;

        if (event.shiftKey) {
          camera.position.x += moveY;
          camera.position.y -= moveX;
        } else {
          camera.position.x += moveX;
          camera.position.y -= moveY;
        }
      }
    };

    canvas.addEventListener('wheel', handleWheel);

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
    };
  });

  return null;
};

export default DesktopCanvasControls;
