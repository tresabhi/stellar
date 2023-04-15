import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import mirrorHorizontal from './mirrorHorizontal';

export default function mirrorSelectedHorizontal(
  x?: number,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    mirrorHorizontal(blueprint.part_selections, x, blueprint);
  } else {
    mutateBlueprint((draft) => {
      mirrorHorizontal(draft.part_selections, x, draft);
    });
  }
}
