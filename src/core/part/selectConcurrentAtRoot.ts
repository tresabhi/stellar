import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import select from './select';
import unselectAll from './unselectAll';

export default function selectConcurrentAtRoot(blueprint?: Blueprint) {
  if (blueprint) {
    if (blueprint.selections.length > 0) unselectAll(blueprint);
    if (blueprint.part_order.length > 0)
      select(blueprint.part_order, blueprint);
  } else {
    mutateBlueprint((draft) => {
      selectConcurrentAtRoot(draft);
    });
  }
}
