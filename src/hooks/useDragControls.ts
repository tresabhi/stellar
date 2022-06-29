import { ThreeEvent, useThree } from '@react-three/fiber';
import { mutateBlueprint, mutateBlueprintVersionless } from 'core/blueprint';
import { getPart, selectPartOnly, translateTranslatableParts } from 'core/part';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { Vector2 } from 'three';
import snap from 'utilities/snap';
import useApp from './useApp';

// TODO: move these into a constants directory
const DEFAULT_SNAP = 0;
const CTRL_SNAP = 1 / 5;
const SHIFT_PRECISION = 5;
const CTRL_SHIFT_SNAP = CTRL_SNAP / SHIFT_PRECISION;

const useDragControls = (id: string) => {
  const {
    gl: { domElement: canvas },
    camera,
  } = useThree();

  let selectedInitially = false;
  let totalDelta = new Vector2();

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    const part = getPart(id) as PartWithTransformations | undefined;
    const { tool, isPanning } = useApp.getState();

    if (
      part && // part actually exists
      (part.selected || part.parentId === null) && // is selected or is at root level
      tool === 'transform' && // tool is transform
      !isPanning // isn't panning right now via the hotkey
    ) {
      event.stopPropagation();

      totalDelta.set(0, 0);
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
      : DEFAULT_SNAP;
    const precision = event.shiftKey ? SHIFT_PRECISION : 1;
    const movement = new Vector2(
      snap(event.movementX / camera.zoom / precision, snapDistance),
      snap(-event.movementY / camera.zoom / precision, snapDistance),
    );

    if (!selectedInitially) {
      selectPartOnly(id);
      selectedInitially = true;
    }

    if (event.movementX && event.movementY) {
      mutateBlueprintVersionless((draft) => {
        translateTranslatableParts(movement, draft.selections, draft);
      });
    }

    totalDelta.add(movement);
    canvas.requestPointerLock();
  };
  const onPointerUp = () => {
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointermove', onPointerMove);

    if (totalDelta.length() !== 0) {
      mutateBlueprintVersionless((draft) => {
        translateTranslatableParts(
          totalDelta.multiplyScalar(-1),
          draft.selections,
          draft,
        );
      });

      mutateBlueprint((draft) => {
        translateTranslatableParts(
          totalDelta.multiplyScalar(-1),
          draft.selections,
          draft,
        );
      });

      const removeSelectionRestriction = () => {
        // fire this just in case selection does not happen
        useApp.setState({ preventNextSelection: false });
        window.removeEventListener('pointerup', removeSelectionRestriction);
      };

      useApp.setState({ preventNextSelection: true });
      window.addEventListener('pointerup', removeSelectionRestriction);
    }

    document.exitPointerLock();
  };

  return handlePointerDown;
};
export default useDragControls;
