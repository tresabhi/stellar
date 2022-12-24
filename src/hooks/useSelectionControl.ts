import { ThreeEvent } from '@react-three/fiber';
import mutateApp from 'core/app/mutateApp';
import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import getParent from 'core/part/getParent';
import getParentId from 'core/part/getParentId';
import getPart from 'core/part/getPart';
import selectPartOnly from 'core/part/selectPartOnly';
import togglePartSelection from 'core/part/togglePartSelection';
import unselectPart from 'core/part/unselectPart';
import useApp, { Tool } from 'stores/app';
import useSettings from 'stores/settings';

const useSelectionControl = (id: string) => {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    const {
      preventNextSelection, tool, isSpacePanning, isTouchPanning,
    } = useApp.getState().editor;

    if (
      !preventNextSelection
      && tool === Tool.Move
      && !isSpacePanning
      && !isTouchPanning
    ) {
      const { selectMultiple, selectDeep } = useSettings.getState().editor;
      const part = getPart(id);
      const parent = getParent(id);

      if (!part.hidden && !part.locked) {
        if (
          part.parent_id === null // part is at root
          || (parent && parent.selected) // parent is selected
          || event.ctrlKey // deep select is active
          || selectDeep
        ) {
          event.stopPropagation();

          if (event.ctrlKey || selectDeep) {
            if (event.shiftKey || selectMultiple) {
              togglePartSelection(id);
            } else {
              selectPartOnly(id);
            }
          } else if (event.shiftKey || selectMultiple) {
            const parentId = getParentId(id);

            mutateBlueprint((draft) => {
              togglePartSelection(id, draft);
              if (parentId) unselectPart(parentId, draft);
            });
          } else {
            selectPartOnly(id);
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
