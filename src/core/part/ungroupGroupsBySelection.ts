import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { ungroupGroups } from './ungroupGroups';

export default function ungroupGroupsBySelection(blueprint?: Blueprint) {
  if (blueprint) {
    ungroupGroups(blueprint.selections, blueprint);
  } else {
    mutateBlueprint((draft) => ungroupGroupsBySelection(draft));
  }
}
