import { invalidate, useThree } from '@react-three/fiber';
import mutateApp from 'core/app/mutateApp';
import useMousePosition from 'hooks/useMousePosition';
import { useEffect } from 'react';
import useApp, { Tool } from 'stores/app';
import { OrthographicCamera, Vector2, Vector2Tuple, Vector3 } from 'three';

export const MIN_ZOOM = 2.2;
export const MAX_ZOOM = 512;
const ZOOM_SENSITIVITY = 1 / 250;

export default function PanControls() {
  const canvas = useThree((state) => state.gl.domElement);
  const camera = useThree((state) => state.camera as OrthographicCamera);
  const regress = useThree((state) => state.performance.regress);
  const getMousePos = useMousePosition();
  const touchMemories = new Map<number, [number, number]>();

  useEffect(() => {
    let lastHypotenuse = 0;
    let initialMousePos: Vector2Tuple;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      if (event.ctrlKey) {
        initialMousePos = getMousePos(event);

        const zoom = Math.max(
          MIN_ZOOM,
          Math.min(
            MAX_ZOOM,
            camera.zoom - event.deltaY * ZOOM_SENSITIVITY * camera.zoom,
          ),
        );

        camera.zoom = zoom;
        camera.updateProjectionMatrix();

        const newPos = getMousePos(event);
        const delta = new Vector2(
          newPos[0] - initialMousePos[0],
          newPos[1] - initialMousePos[1],
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

      invalidate();
      regress();
    };

    const handlePointerUp = () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      canvas.removeEventListener('pointermove', handlePointerMove);
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (useApp.getState().editor.isTouchPanning) {
        handlePointerUp();
      } else {
        const newPos = getMousePos(event);
        const delta = new Vector2(
          newPos[0] - initialMousePos[0],
          newPos[1] - initialMousePos[1],
        );

        camera.translateX(-delta.x);
        camera.translateY(-delta.y);
        invalidate();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!useApp.getState().editor.isTouchPanning) {
        const { tool, isSpacePanning } = useApp.getState().editor;

        if (tool === Tool.Pan || isSpacePanning) {
          initialMousePos = getMousePos(event);
          canvas.addEventListener('pointermove', handlePointerMove);
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
            invalidate();
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
      }

      [...event.changedTouches].forEach((changedTouch) => {
        touchMemories.set(changedTouch.identifier, [
          changedTouch.clientX,
          changedTouch.clientY,
        ]);
      });
    };
    const handleTouchEnd = (event: TouchEvent) => {
      [...event.changedTouches].forEach((changedTouch) => {
        touchMemories.delete(changedTouch.identifier);
      });

      if (touchMemories.size === 0) {
        mutateApp((draft) => {
          draft.editor.isTouchPanning = false;
        });

        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('touchcancel', handleTouchEnd);
      }
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
        event.preventDefault();

        const firstTouch = touchMemories.get(0);
        const secondTouch = touchMemories.get(1);

        mutateApp((draft) => {
          draft.editor.isTouchPanning = true;
        });

        if (firstTouch && secondTouch) {
          lastHypotenuse = Math.sqrt(
            Math.abs(firstTouch[0] - secondTouch[0]) ** 2 +
              Math.abs(firstTouch[1] - secondTouch[1]) ** 2,
          );
        }
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
}
