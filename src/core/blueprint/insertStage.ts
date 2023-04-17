import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import generateStageId from 'core/part/generateStageId';
import { stageData } from 'game/Blueprint';

export default function insertStage() {
  mutateBlueprint((draft) => {
    const insertionIndex =
      draft.stage_selection === null
        ? draft.stages.length - 1
        : draft.stage_selection;

    draft.stages.splice(insertionIndex + 1, 0, {
      ...stageData,
      id: generateStageId(draft.stages),
    });
    draft.stage_selection = insertionIndex + 1;
  });
}
