import { ThreeEvent, useThree } from '@react-three/fiber';
import { CANVAS_MATRIX_SCALE } from 'components/Canvas/components/LayoutCanvas/components/Outlines/components/ResizeControls/components/ResizeNode';
import { mutateApp } from 'core/app';
import { deferUpdates, undeferUpdates } from 'core/bounds';
import {
  getPart,
  selectPart,
  selectPartOnly,
  translatePartsBySelectionAsync,
  translateTranslatablePartsBySelection,
} from 'core/part';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { Vector2 } from 'three';
import getSnapDistance from 'utilities/getSnapDistance';
import useApp, { Tool } from '../stores/app';

const useDragControls = (id: string) => {
  const camera = useThree((state) => state.camera);

  let firstMove = true;
  let selectedInitially = false;
  const initial = new Vector2();
  const movement = new Vector2();

  const handlePointerMove = (event: PointerEvent) => {
    const { tool, isSpacePanning, isTouchPanning } = useApp.getState().editor;

    if (tool === Tool.Pan || isSpacePanning || isTouchPanning) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handlePointerUp();
    } else {
      if (firstMove) {
        firstMove = false;
        deferUpdates();
      }

      const snapDistance = getSnapDistance(event);
      const newMovement = new Vector2(event.clientX, event.clientY)
        .sub(initial)
        .divideScalar(camera.zoom)
        .multiply(CANVAS_MATRIX_SCALE);

      if (snapDistance !== 0) {
        newMovement
          .divideScalar(snapDistance)
          .round()
          .multiplyScalar(snapDistance);
      }

      const delta = newMovement.clone().sub(movement);

      if (!selectedInitially) {
        if (event.shiftKey) {
          selectPart(id);
        } else {
          selectPartOnly(id);
        }

        selectedInitially = true;
      }

      if (delta.length() > 0) {
        translatePartsBySelectionAsync(delta.x, delta.y);
        movement.copy(newMovement);
      }
    }
  };
  const handlePointerUp = () => {
    if (!firstMove) undeferUpdates();

    const removeSelectionRestriction = () => {
      window.removeEventListener('pointerup', removeSelectionRestriction);

      mutateApp((draft) => {
        draft.editor.preventNextSelection = false;
      });
    };

    if (movement.length() > 0) {
      translateTranslatablePartsBySelection(movement.x, movement.y);

      mutateApp((draft) => {
        draft.editor.preventNextSelection = true;
      });
      window.addEventListener('pointerup', removeSelectionRestriction);
    }

    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('pointermove', handlePointerMove);
  };
  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    const part = getPart(id) as PartWithTransformations | undefined;
    const { tool, isSpacePanning, isTouchPanning } = useApp.getState().editor;

    if (
      part
      && (part.selected || part.parent_id === null) // is selected or is at root level
      && !part.hidden
      && !part.locked
      && tool === Tool.Move
      && !isSpacePanning
      && !isTouchPanning
    ) {
      event.stopPropagation();

      firstMove = true;
      selectedInitially = part.selected;
      initial.set(event.nativeEvent.clientX, event.nativeEvent.clientY);
      movement.set(0, 0);

      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointermove', handlePointerMove);
    }
  };

  return handlePointerDown;
};
export default useDragControls;
