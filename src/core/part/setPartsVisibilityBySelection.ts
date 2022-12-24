import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import setPartsVisibility from './setPartsVisibility';

export default function setPartsVisibilityBySelection(
  hidden: boolean,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    setPartsVisibility(blueprint.selections, hidden, blueprint);
  } else {
    mutateBlueprint((draft) => setPartsVisibilityBySelection(hidden, draft));
  }
}
