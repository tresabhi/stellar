import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import mirrorVertical from './mirrorVertical';

export default function mirrorSelectedVertical(
  y?: number,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    mirrorVertical(blueprint.part_selections, y, blueprint);
  } else {
    mutateBlueprint((draft) => {
      mirrorVertical(draft.part_selections, y, draft);
    });
  }
}
