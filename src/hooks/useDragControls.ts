import { ThreeEvent, useThree } from '@react-three/fiber';
import { CANVAS_MATRIX_SCALE } from 'components/Canvas/components/LayoutCanvas/components/PartBounds/components/ResizeNode';
import { mutateApp } from 'core/app';
import {
  getPart,
  selectPart,
  selectPartOnly,
  translateTranslatablePartsBySelection,
} from 'core/part';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { Vector2 } from 'three';
import { getSnapDistance } from 'utilities/getSnapDistance';
import useApp, { Tool } from '../stores/useApp';
import useMousePos from './useMousePos';

export interface PartMoveEventData {
  x: number;
  y: number;
}

const useDragControls = (id: string) => {
  const getMousePos = useMousePos();
  const { camera, invalidate } = useThree();

  let selectedInitially = false;
  const initialPosition = new Vector2();
  const movement = new Vector2();
  const movementSnapped = new Vector2();

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    const part = getPart(id) as PartWithTransformations | undefined;
    const { tool, isSpacePanning, isTouchPanning } = useApp.getState().editor;

    if (
      part &&
      (part.selected || part.parentId === null) && // is selected or is at root level
      !part.hidden &&
      !part.locked &&
      tool === Tool.Move &&
      !isSpacePanning &&
      !isTouchPanning
    ) {
      event.stopPropagation();

      initialPosition.set(event.nativeEvent.clientX, event.nativeEvent.clientY);
      movement.set(0, 0);
      movementSnapped.set(0, 0);
      selectedInitially = part.selected;

      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointermove', handlePointerMove);
    }
  };
  const handlePointerMove = (event: PointerEvent) => {
    const { tool, isSpacePanning, isTouchPanning } = useApp.getState().editor;

    if (tool === Tool.Pan || isSpacePanning || isTouchPanning) {
      handlePointerUp();
    } else {
      const newMovement = new Vector2(event.clientX, event.clientY)
        .sub(initialPosition)
        .multiplyScalar(1 / camera.zoom)
        .multiply(CANVAS_MATRIX_SCALE);
      const snapDistance = getSnapDistance(event);
      const newMovementSnapped =
        snapDistance === 0
          ? newMovement.clone()
          : new Vector2(
              Math.round(newMovement.x / snapDistance) * snapDistance,
              Math.round(newMovement.y / snapDistance) * snapDistance,
            );
      const delta = newMovementSnapped.clone().sub(movementSnapped);

      if (!selectedInitially) {
        if (event.shiftKey) {
          selectPart(id);
        } else {
          selectPartOnly(id);
        }

        selectedInitially = true;
      }

      if (delta.length() > 0) {
        const partMoveEvent = new CustomEvent<PartMoveEventData>('partmove', {
          detail: { x: delta.x, y: delta.y },
        });

        window.dispatchEvent(partMoveEvent);
        movement.copy(newMovement);
        movementSnapped.copy(newMovementSnapped);
        invalidate();
      }
    }
  };
  const handlePointerUp = () => {
    if (movementSnapped.length() > 0) {
      translateTranslatablePartsBySelection(
        movementSnapped.x,
        movementSnapped.y,
      );

      const removeSelectionRestriction = () => {
        // fire this just in case selection does not happen
        mutateApp((draft) => {
          draft.editor.preventNextSelection = false;
        });
        window.removeEventListener('pointerup', removeSelectionRestriction);
      };
      mutateApp((draft) => {
        draft.editor.preventNextSelection = true;
      });

      window.addEventListener('pointerup', removeSelectionRestriction);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    }
  };

  return handlePointerDown;
};
export default useDragControls;
