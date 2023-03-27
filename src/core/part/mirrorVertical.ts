import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { PartWithPosition } from 'game/parts/PartWithPosition';
import { PartWithScale } from 'game/parts/PartWithScale';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';
import getCenter from './getCenter';

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
      mirrorVertical(ids, getCenter(ids)[1], blueprint);
    }
  } else {
    mutateBlueprint((draft) => {
      mirrorVertical(ids, y, draft);
    });
  }
}
