import { ThreeEvent, useThree } from '@react-three/fiber';
import {
  getPart,
  mutateBlueprintWithoutHistory,
  mutateParts,
} from 'interfaces/blueprint';
import { selectPartOnly, togglePartSelection } from 'interfaces/selection';
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
  const canvas = useThree((state) => state.gl.domElement);
  const getMousePos = useMousePos();

  let initialMouseX: number;
  let initialMouseY: number;
  let deltaX = 0;
  let deltaY = 0;

  const onPointerUp = (event: PointerEvent) => {
    event.stopImmediatePropagation();

    canvas.removeEventListener('pointerup', onPointerUp);
    canvas.removeEventListener('pointermove', onPointerMove);

    if (deltaX !== 0) {
      // undo changes
      mutateBlueprintWithoutHistory((draft) => {
        mutateParts(
          draft.selections.current,
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
      mutateParts(blueprintStore.getState().selections.current, (state) => ({
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

    if (newDeltaX !== deltaX || newDeltaY !== deltaY) {
      mutateBlueprintWithoutHistory((draft) => {
        mutateParts(
          blueprintStore.getState().selections.current,
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

    if (part) {
      event.stopPropagation();
      canvas.addEventListener('pointerup', onPointerUp);
      canvas.addEventListener('pointermove', onPointerMove);

      [initialMouseX, initialMouseY] = getMousePos();
      deltaX = 0;
      deltaY = 0;

      if (!part.meta.selected) {
        mutateBlueprintWithoutHistory((draft) => {
          if (event.nativeEvent.shiftKey) {
            togglePartSelection(ID, draft);
          } else {
            selectPartOnly(ID, draft);
          }
        });
      }
    }
  };

  return onPointerDown;
};
export default usePartTranslationControls;
