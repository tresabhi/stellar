import { ThreeEvent, useThree } from '@react-three/fiber';
import {
  CANVAS_MATRIX_SCALE,
  POSITION_SNAP_SIZE,
} from 'components/Canvas/components/TransformControls/components/TransformNode';
import mutateApp from 'core/app/mutateApp';
import deferUpdates from 'core/bounds/deferUpdates';
import declareInteractingWithPart from 'core/interface/declareInteractingWithPart';
import getPart from 'core/part/getPart';
import select from 'core/part/select';
import selectConcurrent from 'core/part/selectConcurrent';
import shouldSnap from 'core/part/shouldSnap';
import translateSelectedAsync from 'core/part/translateSelectedAsync';
import translateSelectedRecursive from 'core/part/translateSelectedRecursive';
import { Part } from 'game/parts/Part';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { Vector2 } from 'three';
import useApp, { Tab, Tool } from '../stores/app';

const useDragControls = (id: string) => {
  const camera = useThree((state) => state.camera);

  let firstMove = true;
  let selectedInitially = false;
  const initial = new Vector2();
  const movement = new Vector2();

  function handlePointerDown(event: ThreeEvent<PointerEvent>) {
    const part = getPart(id) as (Part & PartWithTransformations) | undefined;
    const {
      editor: { tool, isSpacePanning, isTouchPanning, isInteractingWithPart },
      interface: { tab },
    } = useApp.getState();

    if (
      part &&
      (part.selected || part.parent === null) && // is selected or is at root level
      part.visible &&
      !part.locked &&
      tool === Tool.Transform &&
      tab === Tab.Layout &&
      !isSpacePanning &&
      !isTouchPanning &&
      !isInteractingWithPart
    ) {
      event.stopPropagation();

      declareInteractingWithPart();

      firstMove = true;
      selectedInitially = part.selected;
      initial.set(event.nativeEvent.clientX, event.nativeEvent.clientY);
      movement.set(0, 0);

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      window.addEventListener('pointerup', handlePointerUp);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      window.addEventListener('pointermove', handlePointerMove);
    }
  }
  function handlePointerMove(event: PointerEvent) {
    const { tool, isSpacePanning, isTouchPanning } = useApp.getState().editor;

    if (tool === Tool.Pan || isSpacePanning || isTouchPanning) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handlePointerUp();
    } else {
      if (firstMove) {
        firstMove = false;
        deferUpdates();
      }

      const newMovement = new Vector2(event.clientX, event.clientY)
        .sub(initial)
        .divideScalar(camera.zoom)
        .multiply(CANVAS_MATRIX_SCALE);

      if (shouldSnap(event)) {
        newMovement
          .divideScalar(POSITION_SNAP_SIZE)
          .round()
          .multiplyScalar(POSITION_SNAP_SIZE);
      }

      const delta = newMovement.clone().sub(movement);

      if (!selectedInitially) {
        if (event.shiftKey) {
          select(id);
        } else {
          selectConcurrent(id);
        }

        selectedInitially = true;
      }

      if (delta.length() > 0) {
        translateSelectedAsync(delta.x, delta.y);
        movement.copy(newMovement);
      }
    }
  }
  function handlePointerUp() {
    if (!firstMove) deferUpdates(false);

    if (useApp.getState().editor.isInteractingWithPart) {
      declareInteractingWithPart(false);
    }

    const removeSelectionRestriction = () => {
      window.removeEventListener('pointerup', removeSelectionRestriction);

      mutateApp((draft) => {
        draft.editor.preventNextSelection = false;
      });
    };

    if (movement.length() > 0) {
      translateSelectedRecursive(movement.x, movement.y);

      mutateApp((draft) => {
        draft.editor.preventNextSelection = true;
      });
      window.addEventListener('pointerup', removeSelectionRestriction);
    }

    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('pointermove', handlePointerMove);
  }

  return handlePointerDown;
};
export default useDragControls;
