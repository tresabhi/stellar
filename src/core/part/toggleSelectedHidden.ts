import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import toggleHidden from './toggleHidden';

export default function toggleSelectedHidden(blueprint?: Blueprint) {
  if (blueprint) {
    toggleHidden(blueprint.selections, blueprint);
  } else {
    mutateBlueprint((draft) => toggleSelectedHidden(draft));
  }
}
