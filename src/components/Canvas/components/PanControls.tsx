import { useThree } from '@react-three/fiber';
import useMousePos from 'hooks/useMousePos';
import { useEffect } from 'react';
import useApp, { Tool } from 'stores/useApp';
import { OrthographicCamera, Vector2, Vector3 } from 'three';
import { inverseLerp } from 'three/src/math/MathUtils';

const MIN_ZOOM = 2.2;
const MAX_ZOOM = 200;
const SENSITIVITY = 1;

export const PanControls = () => {
  const canvas = useThree((state) => state.gl.domElement);
  const camera = useThree((state) => state.camera as OrthographicCamera);
  const getMousePos = useMousePos();
  const touchMemories = new Map<number, [number, number]>();
  let lastHypotenuse = 0;

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

        camera.position.add(
          new Vector3(delta.x, delta.y, 0).multiplyScalar(-1),
        );
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
      const {
        editor: { tool, isPanning },
      } = useApp.getState();

      if (tool === Tool.Pan || isPanning) {
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
    const handlePointerUp = () => {
      canvas.removeEventListener('pointermove', handlePointerMove);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (touchMemories.size === 0) {
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('touchcancel', handleTouchEnd);
      }

      [...event.changedTouches].forEach((changedTouch) => {
        touchMemories.set(changedTouch.identifier, [
          changedTouch.clientX,
          changedTouch.clientY,
        ]);
      });

      if (touchMemories.size === 2) {
        const firstTouch = touchMemories.get(0);
        const secondTouch = touchMemories.get(1);

        if (firstTouch && secondTouch) {
          lastHypotenuse = Math.sqrt(
            Math.abs(firstTouch[0] - secondTouch[0]) ** 2 +
              Math.abs(firstTouch[1] - secondTouch[1]) ** 2,
          );
        }
      }
    };
    const handleTouchMove = (event: TouchEvent) => {
      if (touchMemories.size === 2) {
        [...event.changedTouches].forEach((changedTouch) => {
          const touchMemory = touchMemories.get(changedTouch.identifier);

          if (touchMemory) {
            const deltaX = changedTouch.clientX - touchMemory[0];
            const deltaY = changedTouch.clientY - touchMemory[1];

            camera.position.add(
              new Vector3(-deltaX, deltaY, 0).multiplyScalar(
                1 / 2 / camera.zoom,
              ),
            );
          }
        });

        const firstTouch = touchMemories.get(0);
        const secondTouch = touchMemories.get(1);

        if (firstTouch && secondTouch) {
          const hypotenuse = Math.sqrt(
            Math.abs(firstTouch[0] - secondTouch[0]) ** 2 +
              Math.abs(firstTouch[1] - secondTouch[1]) ** 2,
          );
          const scale = lastHypotenuse / hypotenuse;

          camera.zoom /= scale;
          camera.updateProjectionMatrix();

          lastHypotenuse = hypotenuse;
        }

        [...event.changedTouches].forEach((changedTouch) => {
          touchMemories.set(changedTouch.identifier, [
            changedTouch.clientX,
            changedTouch.clientY,
          ]);
        });
      }
    };
    const handleTouchEnd = (event: TouchEvent) => {
      [...event.changedTouches].forEach((changedTouch) => {
        touchMemories.delete(changedTouch.identifier);
      });

      if (touchMemories.size === 0) {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('touchcancel', handleTouchEnd);
      }
    };

    canvas.addEventListener('wheel', handleWheel);
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('touchstart', handleTouchStart);

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
    };
  });

  return null;
};
