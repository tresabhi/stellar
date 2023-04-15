import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import toggleLocked from './toggleLocked';

export default function toggleSelectedLocked(blueprint?: Blueprint) {
  if (blueprint) {
    toggleLocked(blueprint.part_selections, blueprint);
  } else {
    mutateBlueprint((draft) => toggleSelectedLocked(draft));
  }
}
