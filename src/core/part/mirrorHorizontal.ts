import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { PartWithPosition } from 'game/parts/PartWithPosition';
import { PartWithScale } from 'game/parts/PartWithScale';
import boundsStore from 'stores/bounds';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';

export default function mirrorHorizontal(
  ids: MethodIds,
  x?: number,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    if (x) {
      normalizeIds(ids).forEach((id) => {
        const part = blueprint.parts[id];

        if (part.n === 'Group') {
          mirrorHorizontal((part as Group).part_order, x, blueprint);
        } else {
          const offset = (part as PartWithPosition).p.x - x;
          (part as PartWithPosition).p.x -= offset * 2;
          (part as PartWithScale).o.x *= -1;
        }
      });
    } else {
      const normalizedIds = normalizeIds(ids);
      let min = boundsStore[normalizedIds[0]].bounds.x;
      let max = boundsStore[normalizedIds[0]].bounds.x;

      normalizedIds.forEach((id) => {
        min = Math.min(min, boundsStore[id].bounds.x);
        max = Math.max(max, boundsStore[id].bounds.x);
      });

      mirrorHorizontal(ids, (min + max) / 2, blueprint);
    }
  } else {
    mutateBlueprint((draft) => {
      mirrorHorizontal(ids, x, draft);
    });
  }
}
