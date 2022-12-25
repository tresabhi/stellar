import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import duplicate from './duplicate';

export default function duplicateSelected(blueprint?: Blueprint) {
  if (blueprint) {
    duplicate(blueprint.selections, blueprint);
  } else {
    mutateBlueprint((draft) => {
      duplicateSelected(draft);
    });
  }
}
