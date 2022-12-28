import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import toggleVisible from './toggleVisible';

export default function toggleSelectedVisible(blueprint?: Blueprint) {
  if (blueprint) {
    toggleVisible(blueprint.selections, blueprint);
  } else {
    mutateBlueprint((draft) => toggleSelectedVisible(draft));
  }
}
