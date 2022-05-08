import { useThree } from '@react-three/fiber';
import { getSelectableIntersectingPart } from 'core/boundingBox';
import {
  getPart,
  selectPartOnly,
  togglePartSelection,
  unselectAllParts,
  unselectPart,
} from 'core/part';
import blueprintStore from 'hooks/useBlueprint';
import useMousePos from 'hooks/useMousePos';
import { useEffect } from 'react';

export const SelectionControls = () => {
  const getMousePos = useMousePos();
  const canvas = useThree((state) => state.gl.domElement);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const mousePos = getMousePos();
      const offset = blueprintStore.getState().offset;

      mousePos.x -= offset.x;
      mousePos.y -= offset.y;

      const ID = getSelectableIntersectingPart(mousePos);

      if (ID) {
        if (event.shiftKey) {
          const part = getPart(ID);

          togglePartSelection(ID);
          if (part?.parentID) unselectPart(part.parentID);
        } else {
          selectPartOnly(ID);
        }
      } else unselectAllParts();
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, [canvas, getMousePos]);

  return null;
};
