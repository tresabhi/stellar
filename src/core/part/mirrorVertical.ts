import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { PartWithPosition } from 'game/parts/PartWithPosition';
import { PartWithScale } from 'game/parts/PartWithScale';
import boundsStore from 'stores/bounds';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';

export default function mirrorVertical(
  ids: MethodIds,
  y?: number,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    if (y) {
      normalizeIds(ids).forEach((id) => {
        const part = blueprint.parts[id];

        if (part.n === 'Group') {
          mirrorVertical((part as Group).part_order, y, blueprint);
        } else {
          const offset = (part as PartWithPosition).p.y - y;
          (part as PartWithPosition).p.y -= offset * 2;
          (part as PartWithScale).o.y *= -1;
        }
      });
    } else {
      const normalizedIds = normalizeIds(ids);
      let min = boundsStore[normalizedIds[0]].bounds.y;
      let max = boundsStore[normalizedIds[0]].bounds.y;

      normalizedIds.forEach((id) => {
        min = Math.min(min, boundsStore[id].bounds.y);
        max = Math.max(max, boundsStore[id].bounds.y);
      });

      mirrorVertical(ids, (min + max) / 2, blueprint);
    }
  } else {
    mutateBlueprint((draft) => {
      mirrorVertical(ids, y, draft);
    });
  }
}
