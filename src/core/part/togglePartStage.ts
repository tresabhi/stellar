import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import { PartWithStages } from 'game/parts/PartWithStages';
import { MethodIds } from 'types/Parts';
import normalizeArray from 'utilities/normalizeArray';

export default function togglePartStage(ids: MethodIds, blueprint?: Blueprint) {
  if (blueprint && blueprint.stage_selection !== null) {
    normalizeArray(ids).forEach((id) => {
      const part = blueprint.parts[id] as Part & Partial<PartWithStages>;

      if (part.stages && blueprint.stage_selection !== null) {
        if (part.stages.includes(blueprint.stage_selection)) {
          part.stages.splice(part.stages.indexOf(blueprint.stage_selection), 1);
        } else {
          part.stages.push(blueprint.stage_selection);
        }
      }
    });
  } else {
    mutateBlueprint((draft) => {
      togglePartStage(ids, draft);
    });
  }
}
