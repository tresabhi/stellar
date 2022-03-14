import { ThreeEvent } from '@react-three/fiber';
import {
  getPart,
  mutateBlueprintWithoutHistory,
  mutateParts,
} from 'interfaces/blueprint';
import {
  selectPart,
  selectPartOnly,
  togglePartSelection,
} from 'interfaces/selection';
import { PartWithMeta, PartWithTransformations } from 'parts/Default';
import blueprintStore from 'stores/blueprint';
import { PartID } from 'types/Parts';
import snap from 'utilities/snap';
import useMousePos from './useMousePos';

const usePartTranslationControls = <
  T extends PartWithTransformations & PartWithMeta,
>(
  ID: PartID,
) => {
  const getMousePos = useMousePos();

  let initialMouseX: number;
  let initialMouseY: number;
  let deltaX = 0;
  let deltaY = 0;
  let movedAtAll = false;
  let wasSelectedInitially = false;

  const onPointerUp = (event: PointerEvent) => {
    event.stopImmediatePropagation();

    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointermove', onPointerMove);

    if (deltaX === 0 && deltaY === 0) {
      if (!movedAtAll && !wasSelectedInitially) {
        if (event.shiftKey) {
          togglePartSelection(ID);
        } else {
          selectPartOnly(ID);
        }
      }
    } else {
      // undo changes
      mutateBlueprintWithoutHistory((draft) => {
        mutateParts(
          draft.selections,
          (state) => ({
            p: {
              x: (state as PartWithTransformations).p.x - deltaX,
              y: (state as PartWithTransformations).p.y - deltaY,
            },
          }),
          draft,
        );
      });
      // apply them again with history
      mutateParts(blueprintStore.getState().selections, (state) => ({
        p: {
          x: (state as PartWithTransformations).p.x + deltaX,
          y: (state as PartWithTransformations).p.y + deltaY,
        },
      }));
    }
  };
  const onPointerMove = () => {
    const [mouseX, mouseY] = getMousePos();
    const newDeltaX = snap(mouseX - initialMouseX, 1);
    const newDeltaY = snap(mouseY - initialMouseY, 1);
    movedAtAll = true;

    if (newDeltaX !== deltaX || newDeltaY !== deltaY) {
      mutateBlueprintWithoutHistory((draft) => {
        mutateParts(
          blueprintStore.getState().selections,
          (state) => ({
            p: {
              x: (state as PartWithTransformations).p.x - deltaX + newDeltaX,
              y: (state as PartWithTransformations).p.y - deltaY + newDeltaY,
            },
          }),
          draft,
        );
      });
    }

    deltaX = newDeltaX;
    deltaY = newDeltaY;
  };
  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    const part = getPart(ID) as T | undefined;
    movedAtAll = false;

    if (part) {
      event.stopPropagation();

      [initialMouseX, initialMouseY] = getMousePos();
      deltaX = 0;
      deltaY = 0;

      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointermove', onPointerMove);

      if (!part.meta.selected) {
        wasSelectedInitially = true;

        if (event.nativeEvent.shiftKey) {
          selectPart(ID);
        } else {
          selectPartOnly(ID);
        }
      }
    }
  };

  return onPointerDown;
};
export default usePartTranslationControls;
