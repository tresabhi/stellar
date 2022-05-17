import { ThreeEvent } from '@react-three/fiber';
import {
  getParent,
  getPart,
  selectPartOnly,
  togglePartSelection,
} from 'core/part';
import { UUID } from 'types/Parts';
import useApp from './useApp';

const usePartSelectionControl = (ID: UUID) => {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (useApp.getState().tool === 'transform') {
      const part = getPart(ID);
      const parent = getParent(ID);

      if (
        (part && part.parentID === null) || // part is root
        (parent && parent.selected) || // parent is selected
        event.nativeEvent.ctrlKey // deep select is active
      ) {
        event.stopPropagation();

        if (part) {
          if (event.nativeEvent.shiftKey) {
            togglePartSelection(ID);
          } else {
            selectPartOnly(ID);
          }
        }
      }
    }
  };

  return handleClick;
};
export default usePartSelectionControl;
