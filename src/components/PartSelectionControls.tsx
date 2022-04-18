import { useThree } from '@react-three/fiber';
import useMousePos from 'hooks/useMousePos';
import { checkForClickableBoundingBoxIntersection } from 'interfaces/part';
import { selectPartOnly } from 'interfaces/selection';
import { useEffect } from 'react';

const PartSelectionControls = () => {
  const getMousePos = useMousePos();
  const canvas = useThree((state) => state.gl.domElement);

  useEffect(() => {
    const handleClick = () => {
      const mousePos = getMousePos();
      const clickedID = checkForClickableBoundingBoxIntersection(mousePos);

      if (clickedID) selectPartOnly(clickedID);
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
};
export default PartSelectionControls;
