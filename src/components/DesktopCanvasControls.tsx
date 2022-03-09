import { useThree } from '@react-three/fiber';
import useMousePos from 'hooks/useMousePos';
import { useEffect } from 'react';
import { OrthographicCamera } from 'three';
import inverseLerp from 'utilities/inverseLerp';

const MIN_ZOOM = 2.2;

// BUG: pressing shift and selecting parts causes the sensitivity to go up

const DesktopCanvasControls = () => {
  const canvas = useThree((state) => state.gl.domElement);
  const camera = useThree((state) => state.camera as OrthographicCamera);
  const getMousePos = useMousePos();

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      if (event.ctrlKey) {
        const [initialX, initialY] = getMousePos();

        const maxZoom = camera.right - camera.left;
        const zoomCompensatedDeltaY =
          event.deltaY * 4 * inverseLerp(0, maxZoom, camera.zoom);
        const zoom = Math.max(
          MIN_ZOOM,
          Math.min(maxZoom, camera.zoom - zoomCompensatedDeltaY),
        );

        camera.zoom = zoom;
        camera.updateProjectionMatrix();

        const [newX, newY] = getMousePos();
        const [deltaX, deltaY] = [newX - initialX, newY - initialY];

        camera.translateX(-deltaX);
        camera.translateY(-deltaY);
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
