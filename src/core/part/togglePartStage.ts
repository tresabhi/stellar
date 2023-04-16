import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import { PartWithStage } from 'game/parts/PartWithStage';
import { PartRegistryItem } from 'stores/partRegistry';
import { MethodIds } from 'types/Parts';
import normalizeArray from 'utilities/normalizeArray';
import getPartRegistry from './getPartRegistry';

export default function togglePartStage(ids: MethodIds, blueprint?: Blueprint) {
  if (blueprint && blueprint.stage_selection !== null) {
    normalizeArray(ids).forEach((id) => {
      const part = blueprint.parts[id];
      const { stageable } = getPartRegistry(part.n) as PartRegistryItem<Part>;

      if (stageable) {
        const stage = blueprint.stages[blueprint.stage_selection as number];
        if ((part as PartWithStage).stage === undefined) {
          (part as PartWithStage).stage = blueprint.stage_selection as number;
          stage.part_order.push(id);
        } else {
          (part as PartWithStage).stage = undefined;
          stage.part_order.splice(stage.part_order.indexOf(id), 1);
        }
      }
    });
  } else {
    mutateBlueprint((draft) => {
      togglePartStage(ids, draft);
    });
  }
}
