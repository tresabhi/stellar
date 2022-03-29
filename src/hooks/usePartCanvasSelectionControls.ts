import { ThreeEvent } from '@react-three/fiber';
import { selectPartOnly, togglePartSelection } from 'interfaces/selection';
import { useEffect } from 'react';
import { UUID } from 'types/Parts';

const usePartCanvasSelectionControls = (ID: UUID) => {
  let isClickValid = false;

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (isClickValid) {
      if (event.nativeEvent.shiftKey) {
        togglePartSelection(ID);
      } else {
        selectPartOnly(ID);
      }

      isClickValid = false;
    }
  };
  const handlePointerDown = () => {
    isClickValid = true;
  };
  const handlePointerMove = () => {
    isClickValid = false;
  };

  useEffect(() => {
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  });

  return handleClick;
};
export default usePartCanvasSelectionControls;
