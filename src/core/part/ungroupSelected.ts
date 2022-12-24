import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import ungroup from './ungroup';

export default function ungroupSelected(blueprint?: Blueprint) {
  if (blueprint) {
    ungroup(blueprint.selections, blueprint);
  } else {
    mutateBlueprint((draft) => ungroupSelected(draft));
  }
}
