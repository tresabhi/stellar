import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import mirrorHorizontal from './mirrorHorizontal';

export default function mirrorSelectedHorizontal(
  x?: number,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    mirrorHorizontal(blueprint.selections, x, blueprint);
  } else {
    mutateBlueprint((draft) => {
      mirrorHorizontal(draft.selections, x, draft);
    });
  }
}
