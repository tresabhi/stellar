import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import ungroupGroups from './ungroupGroups';

export default function ungroupGroupsBySelection(blueprint?: Blueprint) {
  if (blueprint) {
    ungroupGroups(blueprint.selections, blueprint);
  } else {
    mutateBlueprint((draft) => ungroupGroupsBySelection(draft));
  }
}
