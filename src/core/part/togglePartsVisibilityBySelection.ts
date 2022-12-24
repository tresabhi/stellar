import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import togglePartsVisibility from './togglePartsVisibility';

export default function togglePartsVisibilityBySelection(
  blueprint?: Blueprint,
) {
  if (blueprint) {
    togglePartsVisibility(blueprint.selections, blueprint);
  } else {
    mutateBlueprint((draft) => togglePartsVisibilityBySelection(draft));
  }
}
