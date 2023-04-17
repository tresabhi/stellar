import { ThreeEvent } from '@react-three/fiber';
import mutateApp from 'core/app/mutateApp';
import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import getParent from 'core/part/getParent';
import getParentId from 'core/part/getParentId';
import getPart from 'core/part/getPart';
import selectConcurrent from 'core/part/selectConcurrent';
import togglePartStage from 'core/part/togglePartStage';
import toggleSelection from 'core/part/toggleSelection';
import unselect from 'core/part/unselect';
import useApp, { Tab, Tool } from 'stores/app';

const useSelectionControl = (id: string) => {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    const {
      editor: { preventNextSelection, tool, isSpacePanning, isTouchPanning },
      interface: { tab },
    } = useApp.getState();

    if (tab === Tab.Layout) {
      if (
        !preventNextSelection &&
        tool === Tool.Transform &&
        !isSpacePanning &&
        !isTouchPanning
      ) {
        const { selectMultiple, selectDeep } = useApp.getState().editor;
        const part = getPart(id);
        const parent = getParent(id);

        if (part.visible && !part.locked) {
          if (
            part.parent === null || // part is at root
            (parent && parent.selected) || // parent is selected
            event.ctrlKey || // deep select is active
            selectDeep
          ) {
            event.stopPropagation();

            if (event.ctrlKey || selectDeep) {
              if (event.shiftKey || selectMultiple) {
                toggleSelection(id);
              } else {
                selectConcurrent(id);
              }
            } else if (event.shiftKey || selectMultiple) {
              const parentId = getParentId(id);

              mutateBlueprint((draft) => {
                toggleSelection(id, draft);
                if (parentId) unselect(parentId, draft);
              });
            } else {
              selectConcurrent(id);
            }
          }
        } else {
          mutateApp((draft) => {
            draft.editor.preventNextSelection = false;
          });
          event.stopPropagation();
        }
      }
    } else {
      togglePartStage(id);
    }
  };

  return handleClick;
};
export default useSelectionControl;
