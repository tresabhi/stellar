import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import setLocked from './setLocked';

export default function setSelectedLocked(
  locked: boolean,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    setLocked(blueprint.selections, locked, blueprint);
  } else {
    mutateBlueprint((draft) => setSelectedLocked(locked, draft));
  }
}
