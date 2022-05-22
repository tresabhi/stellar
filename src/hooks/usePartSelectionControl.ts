import { ThreeEvent } from '@react-three/fiber';
import { mutateBlueprint } from 'core/blueprint';
import {
  getParent,
  getParentID,
  getPart,
  selectPartOnly,
  togglePartSelection,
  unselectPart
} from 'core/part';
import { UUID } from 'types/Parts';
import useApp from './useApp';

const usePartSelectionControl = (ID: UUID) => {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (
      !useApp.getState().preventNextSelection &&
      useApp.getState().tool === 'transform'
    ) {
      const part = getPart(ID);
      const parent = getParent(ID);

      if (
        (part && part.parentID === null) || // part is root
        (parent && parent.selected) || // parent is selected
        event.nativeEvent.ctrlKey // deep select is active
      ) {
        event.stopPropagation();

        if (part) {
          if (event.nativeEvent.ctrlKey) {
            if (event.nativeEvent.shiftKey) {
              togglePartSelection(ID);
            } else {
              selectPartOnly(ID);
            }
          } else {
            if (event.nativeEvent.shiftKey) {
              const parentID = getParentID(ID);

              mutateBlueprint((draft) => {
                togglePartSelection(ID, draft);
                if (parentID) unselectPart(parentID, draft);
              });
            } else {
              selectPartOnly(ID);
            }
          }
        }
      }
    } else {
      useApp.setState({ preventNextSelection: false });
      event.stopPropagation();
    }
  };

  return handleClick;
};
export default usePartSelectionControl;
