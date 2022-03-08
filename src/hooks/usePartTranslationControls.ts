import { ThreeEvent, useThree } from '@react-three/fiber';
import {
  getPart,
  mutateBlueprint,
  mutateBlueprintWithoutHistory,
  mutatePartWithoutHistory
} from 'interfaces/blueprint';
import { PartWithMeta, PartWithTransformations } from 'parts/Default';
import { MutableRefObject } from 'react';
import { Group, Mesh } from 'three';
import { PartID } from 'types/Parts';
import snap from 'utilities/snap';
import useMousePos from './useMousePos';

const usePartTranslationControls = (
  ID: PartID,
  mesh: MutableRefObject<Mesh | Group>,
) => {
  const canvas = useThree((state) => state.gl.domElement);
  const getMousePos = useMousePos();

  let startMouseX = 0;
  let startMouseY = 0;
  let deltaX = 0;
  let deltaY = 0;
  let initialPartX = 0;
  let initialPartY = 0;
  let selectedInitially = false;

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointermove', handlePointerMove);

    const part = getPart(ID) as PartWithTransformations & PartWithMeta;

    initialPartX = part.p.x;
    initialPartY = part.p.y;
    [startMouseX, startMouseY] = getMousePos();
    selectedInitially = part.meta.selected; // if selected already, move everything

    if (!selectedInitially) {
      mutatePartWithoutHistory(ID, { meta: { selected: true } });
    }

    deltaX = 0;
    deltaY = 0;
  };
  const handlePointerMove = () => {
    const [mouseX, mouseY] = getMousePos();

    const newDeltaX = snap(mouseX - startMouseX, 1);
    const newDeltaY = snap(mouseY - startMouseY, 1);

    mutateBlueprintWithoutHistory((draft) => {
      const part = getPart(ID, draft) as PartWithTransformations | undefined;

      if (part) {
        part.p.x = part.p.x - deltaX + newDeltaX;
        part.p.y = part.p.y - deltaY + newDeltaY;
      }
    });

    deltaX = newDeltaX;
    deltaY = newDeltaY;
  };
  const handlePointerUp = (event: PointerEvent) => {
    event.stopPropagation();
    canvas.removeEventListener('pointerup', handlePointerUp);
    canvas.removeEventListener('pointermove', handlePointerMove);

    // TODO: find a way to optimize this?

    // revert to original state
    mutateBlueprintWithoutHistory((draft) => {
      const part = getPart(ID, draft) as
        | (PartWithTransformations & PartWithMeta)
        | undefined;

      if (part) {
        part.p.x = initialPartX;
        part.p.y = initialPartY;

        if (!selectedInitially) {
          part.meta.selected = false;
        }
      }
    });

    // create the new state
    mutateBlueprint((draft) => {
      const part = getPart(ID, draft) as
        | (PartWithTransformations & PartWithMeta)
        | undefined;

      if (part) {
        part.p.x = part.p.x + deltaX;
        part.p.y = part.p.y + deltaY;

        if (!selectedInitially) {
          part.meta.selected = true;
        }
      }
    });
  };

  return {
    onPointerDown: handlePointerDown,
  };
};
export default usePartTranslationControls;
