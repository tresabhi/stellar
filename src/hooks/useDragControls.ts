import { ThreeEvent, useThree } from '@react-three/fiber';
import { mutateVersionControl } from 'core/app';
import { mutateApp } from 'core/app/mutateApp';
import { getPart, selectPartOnly, translateTranslatableParts } from 'core/part';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { Patch, produceWithPatches } from 'immer';
import useBlueprint from 'stores/useBlueprint';
import useSettings from 'stores/useSettings';
import { Vector2 } from 'three';
import { getSnapDistance } from 'utilities/getSnapDistance';
import snap from 'utilities/snap';
import useApp, { Tool } from '../stores/useApp';
import useMousePos from './useMousePos';
import { selectionAbstraction } from './useSelectionControl';

const useDragControls = (id: string) => {
  const getMousePos = useMousePos();
  const { invalidate } = useThree();

  let selectedInitially = false;
  let initialMousePos: Vector2;
  const lastDelta = new Vector2();
  const lastSnappedDelta = new Vector2();
  let inversePatchesX: Patch[] | undefined;
  let inversePatchesY: Patch[] | undefined;
  let patchesX: Patch[] | undefined;
  let patchesY: Patch[] | undefined;

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
      handlePointerUp(event);
    } else {
      const snapDistance = getSnapDistance(event);
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

      if (movement.length() > 0) {
        const [nextState, patches, inversePatches] = produceWithPatches(
          useBlueprint.getState(),
          (draft) => {
            translateTranslatableParts(
              movement.x,
              movement.y,
              draft.selections,
              draft,
            );
          },
        );

        if (movement.x !== 0 && movement.y === 0) {
          patchesX = patches;
          if (inversePatchesX === undefined) inversePatchesX = inversePatches;
        } else if (movement.x === 0 && movement.y !== 0) {
          patchesY = patches;
          if (inversePatchesY === undefined) inversePatchesY = inversePatches;
        } else {
          patchesX = patches.filter(
            (patch) => patch.path[patch.path.length - 1] === 'x',
          );
          patchesY = patches.filter(
            (patch) => patch.path[patch.path.length - 1] === 'y',
          );

          if (inversePatchesX === undefined) {
            inversePatchesX = inversePatches.filter(
              (patch) => patch.path[patch.path.length - 1] === 'x',
            );
          }
          if (inversePatchesY === undefined) {
            inversePatchesY = inversePatches.filter(
              (patch) => patch.path[patch.path.length - 1] === 'y',
            );
          }
        }

        useBlueprint.setState(nextState);
        lastDelta.copy(delta);
        lastSnappedDelta.copy(snappedDelta);
        invalidate();
      }
    }
  };
  const handlePointerUp = (event: PointerEvent) => {
    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('pointermove', handlePointerMove);

    const lastPatches = [...(patchesX ?? []), ...(patchesY ?? [])];
    const firstInversePatches = [
      ...(inversePatchesX ?? []),
      ...(inversePatchesY ?? []),
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
      inversePatchesX = undefined;
      inversePatchesY = undefined;
      patchesX = undefined;
      patchesY = undefined;
    } else {
      selectionAbstraction(
        {
          ctrlKey: event.ctrlKey,
          shiftKey: event.shiftKey,
          stopPropagation: event.stopPropagation,
        },
        id,
      );
    }
  };

  return handlePointerDown;
};
export default useDragControls;
