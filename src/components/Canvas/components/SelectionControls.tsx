import { useThree } from '@react-three/fiber';
import { getSelectableIntersectingPart } from 'core/boundingBox';
import {
  getPart,
  selectPartOnly,
  togglePartSelection,
  unselectAllParts,
  unselectPart,
} from 'core/part';
import useApp from 'hooks/useApp';
import useBlueprint from 'hooks/useBlueprint';
import useMousePos from 'hooks/useMousePos';
import { useEffect } from 'react';

export const SelectionControls = () => {
  const getMousePos = useMousePos();
  const canvas = useThree((state) => state.gl.domElement);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const tool = useApp.getState().tool;

      if (tool === 'transform') {
        const mousePos = getMousePos();
        const offset = useBlueprint.getState().offset;

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
        } else if (useBlueprint.getState().selections.length > 0) {
          unselectAllParts();
        }
      }
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, [canvas, getMousePos]);

  return null;
};
