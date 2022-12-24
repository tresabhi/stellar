import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import duplicateParts from './duplicateParts';

export default function duplicatePartsBySelection(blueprint?: Blueprint) {
  if (blueprint) {
    duplicateParts(blueprint.selections, blueprint);
  } else {
    mutateBlueprint((draft) => {
      duplicatePartsBySelection(draft);
    });
  }
}
