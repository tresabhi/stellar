import { ThreeEvent, useThree } from '@react-three/fiber';
import { mutateVersionControl } from 'core/app';
import { mutateApp } from 'core/app/mutateApp';
import { getPart, selectPartOnly, translateTranslatableParts } from 'core/part';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { Patch, produceWithPatches } from 'immer';
import useBlueprint from 'stores/useBlueprint';
import useSettings from 'stores/useSettings';
import { Vector2 } from 'three';
import snap from 'utilities/snap';
import useApp, { Tool } from '../stores/useApp';
import useMousePos from './useMousePos';

const DEFAULT_SNAP = 1 / 2;
const CTRL_SNAP = 1 / 10;
const SHIFT_SNAP = 1;
const CTRL_SHIFT_SNAP = 0;

const useDragControls = (id: string) => {
  const getMousePos = useMousePos();
  const { invalidate } = useThree();

  let selectedInitially = false;
  let initialMousePos: Vector2;
  const lastDelta = new Vector2();
  const lastSnappedDelta = new Vector2();
  let firstInversePatchesX: Patch[] | undefined;
  let firstInversePatchesY: Patch[] | undefined;
  let lastPatchesX: Patch[] | undefined;
  let lastPatchesY: Patch[] | undefined;

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

      initialMousePos = getMousePos(event);
      lastDelta.set(0, 0);
      lastSnappedDelta.set(0, 0);
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
      const snapDistance = event.ctrlKey
        ? event.shiftKey
          ? CTRL_SHIFT_SNAP
          : CTRL_SNAP
        : event.shiftKey
        ? SHIFT_SNAP
        : DEFAULT_SNAP;
      const mousePos = getMousePos(event);
      const delta = new Vector2(
        mousePos.x - initialMousePos.x,
        mousePos.y - initialMousePos.y,
      );
      const snappedDelta = new Vector2(
        snap(delta.x, snapDistance),
        snap(delta.y, snapDistance),
      );
      const movement = snappedDelta.clone().sub(lastSnappedDelta);

      if (!selectedInitially) {
        selectPartOnly(id);
        selectedInitially = true;
      }

      if (movement.x !== 0) {
        const [nextState, patches, inversePatches] = produceWithPatches(
          useBlueprint.getState(),
          (draft) => {
            translateTranslatableParts(movement.x, 0, draft.selections, draft);
          },
        );

        if (patches.length > 0) {
          lastPatchesX = patches;
          if (!firstInversePatchesX) firstInversePatchesX = inversePatches;

          useBlueprint.setState(nextState);
        }

        invalidate();
      }

      if (movement.y !== 0) {
        const [nextState, patches, inversePatches] = produceWithPatches(
          useBlueprint.getState(),
          (draft) => {
            translateTranslatableParts(0, movement.y, draft.selections, draft);
          },
        );

        if (patches.length > 0) {
          lastPatchesY = patches;
          if (!firstInversePatchesY) firstInversePatchesY = inversePatches;

          useBlueprint.setState(nextState);
        }
      }

      lastDelta.copy(delta);
      lastSnappedDelta.copy(snappedDelta);
    }
  };
  const handlePointerUp = () => {
    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('pointermove', handlePointerMove);

    const lastPatches = [...(lastPatchesX ?? []), ...(lastPatchesY ?? [])];
    const firstInversePatches = [
      ...(firstInversePatchesX ?? []),
      ...(firstInversePatchesY ?? []),
    ];

    if (lastDelta.length() > 0) {
      const { undoLimit } = useSettings.getState().editor;

      mutateVersionControl((draft) => {
        draft.history.splice(
          draft.index + 1,
          draft.history.length - draft.index - 1,
        );

        draft.history.push({
          inversePatches: firstInversePatches,
          patches: lastPatches,
        });

        if (undoLimit === 0) {
          draft.index++;
        } else {
          if (draft.history.length > undoLimit) {
            draft.history.shift();
          } else {
            draft.index++;
          }
        }
      });

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

      // clean up
      firstInversePatchesX = undefined;
      firstInversePatchesY = undefined;
      lastPatchesX = undefined;
      lastPatchesY = undefined;
    }
  };

  return handlePointerDown;
};
export default useDragControls;
