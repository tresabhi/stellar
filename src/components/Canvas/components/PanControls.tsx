import { useThree } from '@react-three/fiber';
import useApp, { TOOL } from 'hooks/useApp';
import useMousePos from 'hooks/useMousePos';
import { useEffect } from 'react';
import { OrthographicCamera, Vector2 } from 'three';
import { inverseLerp } from 'three/src/math/MathUtils';

const MIN_ZOOM = 2.2;
const MAX_ZOOM = 200;
const SENSITIVITY = 1;

export const PanControls = () => {
  const canvas = useThree((state) => state.gl.domElement);
  const camera = useThree((state) => state.camera as OrthographicCamera);
  const getMousePos = useMousePos();

  useEffect(() => {
    let initialMousePos: Vector2;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      if (event.ctrlKey) {
        const initialMousePos = getMousePos(event);

        const zoomCompensatedDeltaY =
          event.deltaY * SENSITIVITY * inverseLerp(0, MAX_ZOOM, camera.zoom);
        const zoom = Math.max(
          MIN_ZOOM,
          Math.min(MAX_ZOOM, camera.zoom - zoomCompensatedDeltaY),
        );

        camera.zoom = zoom;
        camera.updateProjectionMatrix();

        const newPos = getMousePos(event);
        const delta = new Vector2(
          newPos.x - initialMousePos.x,
          newPos.y - initialMousePos.y,
        );

        camera.translateX(-delta.x);
        camera.translateY(-delta.y);
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

    const handlePointerDown = (event: PointerEvent) => {
      const { tool, isPanning } = useApp.getState();

      if (tool === TOOL.PAN || isPanning) {
        initialMousePos = getMousePos(event);
        canvas.addEventListener('pointermove', handlePointerMove);
      }
    };
    const handlePointerMove = (event: PointerEvent) => {
      const newPos = getMousePos(event);
      const delta = new Vector2(
        newPos.x - initialMousePos.x,
        newPos.y - initialMousePos.y,
      );

      camera.translateX(-delta.x);
      camera.translateY(-delta.y);
    };
    const handlePointerUp = () =>
      canvas.removeEventListener('pointermove', handlePointerMove);

    canvas.addEventListener('wheel', handleWheel);
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
    };
  });

  return null;
};
