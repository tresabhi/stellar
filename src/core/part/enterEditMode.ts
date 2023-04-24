import { groupedControls } from 'components/Canvas/components/EditControls';
import mutateApp from 'core/app/mutateApp';
import useApp, { Tool } from 'stores/app';
import useBlueprint from 'stores/blueprint';
import getPart from './getPart';
import selectConcurrent from './selectConcurrent';

export default function enterEditMode() {
  const { tool } = useApp.getState().editor;

  if (tool === Tool.Edit) {
    mutateApp((draft) => {
      draft.editor.tool = Tool.Transform;
    });
  } else {
    const { part_selections } = useBlueprint.getState();

    if (
      part_selections.length >= 1 &&
      getPart(part_selections[0]).n in groupedControls
    ) {
      if (part_selections.length > 1) selectConcurrent(part_selections[0]);
      mutateApp((draft) => {
        draft.editor.tool = Tool.Edit;
      });
    }
  }
}
