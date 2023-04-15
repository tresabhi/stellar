import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import rotate from './rotate';

export default function rotateSelected(z: number, blueprint?: Blueprint) {
  if (blueprint) {
    rotate(blueprint.part_selections, z, blueprint);
  } else {
    mutateBlueprint((draft) => {
      rotate(draft.part_selections, z, draft);
    });
  }
}
