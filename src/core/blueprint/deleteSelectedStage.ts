import mutateBlueprint from './mutateBlueprint';

export default function deleteSelectedStage() {
  mutateBlueprint((draft) => {
    if (draft.stage_selection !== null) {
      draft.stages.splice(draft.stage_selection, 1);

      if (draft.stage_selection > 0) {
        draft.stage_selection--;
      } else if (draft.stages.length === 0) {
        draft.stage_selection = null;
      }
    }
  });
}
