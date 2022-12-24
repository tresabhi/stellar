import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import setHidden from './setHidden';

export default function setSelectedHidden(
  hidden: boolean,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    setHidden(blueprint.selections, hidden, blueprint);
  } else {
    mutateBlueprint((draft) => setSelectedHidden(hidden, draft));
  }
}
