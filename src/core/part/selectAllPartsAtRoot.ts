import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import selectParts from './selectParts';
import unselectAllParts from './unselectAllParts';

export default function selectAllPartsAtRoot(blueprint?: Blueprint) {
  if (blueprint) {
    if (blueprint.selections.length > 0) {
      unselectAllParts(blueprint);
    }

    if (blueprint.part_order.length > 0) {
      selectParts(blueprint.part_order, blueprint);
    }
  } else {
    mutateBlueprint((draft) => {
      selectAllPartsAtRoot(draft);
    });
  }
}
