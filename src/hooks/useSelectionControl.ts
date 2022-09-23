import { ThreeEvent } from '@react-three/fiber';
import { mutateApp } from 'core/app/mutateApp';
import { mutateBlueprint } from 'core/blueprint';
import {
  getParent,
  getParentId,
  getPart,
  selectPartOnly,
  togglePartSelection,
  unselectPart,
} from 'core/part';
import useSettings from 'stores/useSettings';
import useApp, { Tool } from '../stores/useApp';

const useSelectionControl = (id: string) => {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    const { preventNextSelection, tool, isSpacePanning, isTouchPanning } =
      useApp.getState().editor;

    if (
      !preventNextSelection &&
      tool === Tool.Move &&
      !isSpacePanning &&
      !isTouchPanning
    ) {
      const { selectMultiple } = useSettings.getState().editor;
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
              if (event.nativeEvent.shiftKey || selectMultiple) {
                togglePartSelection(id);
              } else {
                selectPartOnly(id);
              }
            } else {
              if (event.nativeEvent.shiftKey || selectMultiple) {
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
        mutateApp((draft) => {
          draft.editor.preventNextSelection = false;
        });
        event.stopPropagation();
      }
    }
  };

  return handleClick;
};
export default useSelectionControl;
