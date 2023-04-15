import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { stageData } from 'game/Blueprint';

export default function insertStage() {
  mutateBlueprint((draft) => {
    draft.stages.splice(
      draft.stage_selection === null
        ? draft.stages.length - 1
        : draft.stage_selection,
      0,
      stageData,
    );
  });
}
