import { ThreeEvent } from '@react-three/fiber';
import { mutateBlueprint } from 'core/blueprint';
import {
  getParent,
  getParentId,
  getPart,
  selectPartOnly,
  togglePartSelection,
  unselectPart,
} from 'core/part';
import useApp, { TOOL } from './useApp';

const useSelectionControl = (id: string) => {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    const { preventNextSelection, tool, isPanning } = useApp.getState();

    if (!preventNextSelection && tool === TOOL.MOVE && !isPanning) {
      const part = getPart(id);
      const parent = getParent(id);

      if (part && !part.hidden && !part.locked) {
        if (
          part.parentId === null || // part is at root
          (parent && parent.selected) || // parent is selected
          event.nativeEvent.ctrlKey // deep select is active
        ) {
          event.stopPropagation();

          if (part) {
            if (event.nativeEvent.ctrlKey) {
              if (event.nativeEvent.shiftKey) {
                togglePartSelection(id);
              } else {
                selectPartOnly(id);
              }
            } else {
              if (event.nativeEvent.shiftKey) {
                const parentId = getParentId(id);

                mutateBlueprint((draft) => {
                  togglePartSelection(id, draft);
                  if (parentId) unselectPart(parentId, draft);
                });
              } else {
                selectPartOnly(id);
              }
            }
          }
        }
      } else {
        useApp.setState({ preventNextSelection: false });
        event.stopPropagation();
      }
    }
  };

  return handleClick;
};
export default useSelectionControl;
