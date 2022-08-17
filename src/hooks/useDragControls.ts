import { ThreeEvent } from '@react-three/fiber';
import { UNDO_LIMIT } from 'core/blueprint';
import { getPart, selectPartOnly, translateTranslatableParts } from 'core/part';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import produce, { Patch, produceWithPatches } from 'immer';
import useBlueprint from 'stores/useBlueprint';
import { Vector2 } from 'three';
import snap from 'utilities/snap';
import useApp, { Tool } from '../stores/useApp';
import useVersionControl, {
  UseVersionControl,
} from '../stores/useVersionControl';
import useMousePos from './useMousePos';

const DEFAULT_SNAP = 1 / 2;
const CTRL_SNAP = 1 / 10;
const SHIFT_SNAP = 1;
const CTRL_SHIFT_SNAP = 0;

const useDragControls = (id: string) => {
  const getMousePos = useMousePos();

  let selectedInitially = false;
  let initialMousePos: Vector2;
  let lastDelta = new Vector2();
  let lastSnappedDelta = new Vector2();
  let firstInversePatches: Patch[] | undefined;
  let lastPatches: Patch[] | undefined;

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    const part = getPart(id) as PartWithTransformations | undefined;
    const { tool, isPanning } = useApp.getState();

    if (
      part &&
      (part.selected || part.parentId === null) && // is selected or is at root level
      !part.hidden &&
      !part.locked &&
      tool === Tool.Move &&
      !isPanning // isn't panning right now via the hotkey
    ) {
      event.stopPropagation();

      initialMousePos = getMousePos(event);
      lastDelta.set(0, 0);
      lastSnappedDelta.set(0, 0);
      selectedInitially = part.selected;

      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointermove', onPointerMove);
    }
  };
  const onPointerMove = (event: PointerEvent) => {
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

    if (movement.x !== 0 || movement.y !== 0) {
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

      if (inversePatches.length > 0) {
        if (!firstInversePatches) firstInversePatches = inversePatches;
        lastPatches = patches;
        useBlueprint.setState(nextState);
      }
    }

    lastDelta.copy(delta);
    lastSnappedDelta.copy(snappedDelta);
  };
  const onPointerUp = () => {
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointermove', onPointerMove);

    if (lastPatches) {
      useVersionControl.setState(
        produce<UseVersionControl>((draft) => {
          draft.history.splice(
            draft.index + 1,
            draft.history.length - draft.index - 1,
          );

          draft.history.push({
            inversePatches: firstInversePatches!,
            patches: lastPatches!,
          });

          if (UNDO_LIMIT === 0) {
            draft.index++;
          } else {
            if (draft.history.length > UNDO_LIMIT) {
              draft.history.shift();
            } else {
              draft.index++;
            }
          }
        }),
      );

      const removeSelectionRestriction = () => {
        // fire this just in case selection does not happen
        useApp.setState({ preventNextSelection: false });
        window.removeEventListener('pointerup', removeSelectionRestriction);
      };

      useApp.setState({ preventNextSelection: true });
      window.addEventListener('pointerup', removeSelectionRestriction);

      // clean up
      firstInversePatches = undefined;
      lastPatches = undefined;
    }
  };

  return handlePointerDown;
};
export default useDragControls;
