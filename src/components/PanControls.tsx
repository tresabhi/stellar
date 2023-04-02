import { invalidate, useThree } from '@react-three/fiber';
import mutateApp from 'core/app/mutateApp';
import declareInteractingWithPart from 'core/interface/declareInteractingWithPart';
import useMousePosition from 'hooks/useMousePosition';
import { clamp } from 'lodash';
import { useEffect } from 'react';
import useApp, { Tool } from 'stores/app';
import { OrthographicCamera, Vector2, Vector2Tuple, Vector3 } from 'three';

export const MIN_ZOOM = 2.2;
export const MAX_ZOOM = 512;
const ZOOM_SENSITIVITY = 1 / 128;

export default function PanControls() {
  const canvas = useThree((state) => state.gl.domElement);
  const camera = useThree((state) => state.camera as OrthographicCamera);
  const getMousePos = useMousePosition();

  useEffect(() => {
    let lastHypotenuse = 0;
    let initialMousePos: Vector2Tuple;
    const touchMemories = new Map<number, [number, number]>();
    let firstMove = true;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      if (event.ctrlKey) {
        initialMousePos = getMousePos(event);

        camera.zoom *= Math.E ** (-event.deltaY * ZOOM_SENSITIVITY);
        camera.zoom = clamp(camera.zoom, MIN_ZOOM, MAX_ZOOM);
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
    };

    const handlePointerDown = (event: PointerEvent | MouseEvent) => {
      if (!useApp.getState().editor.isTouchPanning) {
        const { tool, isSpacePanning } = useApp.getState().editor;

        if (tool === Tool.Pan || isSpacePanning || event.button === 1) {
          initialMousePos = getMousePos(event);
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          window.addEventListener('pointermove', handlePointerMove);
        }
      }
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (useApp.getState().editor.isTouchPanning) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
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
    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };

    const handleTouchStart = (event: TouchEvent) => {
      firstMove = true;

      if (touchMemories.size === 0) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        window.addEventListener('touchmove', handleTouchMove);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        window.addEventListener('touchend', handleTouchEnd);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
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
    const handleTouchMove = (event: TouchEvent) => {
      if (touchMemories.size === 2) {
        if (firstMove) {
          firstMove = false;
          declareInteractingWithPart();
        }

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
          const rect = canvas.getBoundingClientRect();
          const canvasX = rect.left + rect.width / 2;
          const canvasY = rect.top + rect.height / 2;
          const touchX = (firstTouch[0] + secondTouch[0]) / 2;
          const touchY = (firstTouch[1] + secondTouch[1]) / 2;
          const deltaX = canvasX - touchX;
          const deltaY = canvasY - touchY;
          const zoomedDeltaX = deltaX / camera.zoom;
          const zoomedDeltaY = deltaY / camera.zoom;
          const scaledDeltaX = zoomedDeltaX * scale;
          const scaledDeltaY = zoomedDeltaY * scale;
          const offsetX = scaledDeltaX - zoomedDeltaX;
          const offsetY = scaledDeltaY - zoomedDeltaY;

          camera.position.x += offsetX;
          camera.position.y -= offsetY;
          camera.zoom /= scale;
          lastHypotenuse = hypotenuse;

          camera.updateProjectionMatrix();
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
          draft.editor.isInteractingWithPart = false;
        });

        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('touchcancel', handleTouchEnd);
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 1) handlePointerDown(event);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handlePointerUp);
    canvas.addEventListener('wheel', handleWheel);
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('touchstart', handleTouchStart);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handlePointerUp);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
    };
  }, [camera, canvas, getMousePos]);

  return null;
}
