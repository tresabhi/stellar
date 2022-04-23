import { useThree } from '@react-three/fiber';
import useMousePos from 'hooks/useMousePos';
import { getPart } from 'interfaces/blueprint';
import { checkForClickableBoundingBoxIntersection } from 'interfaces/part';
import {
  selectPartOnly,
  togglePartSelection,
  unselectAllParts,
  unselectPart
} from 'interfaces/selection';
import { useEffect } from 'react';

const PartSelectionControls = () => {
  const getMousePos = useMousePos();
  const canvas = useThree((state) => state.gl.domElement);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const mousePos = getMousePos();
      const ID = checkForClickableBoundingBoxIntersection(mousePos);

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
export default PartSelectionControls;
