import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { PartWithPosition } from 'game/parts/PartWithPosition';
import { PartWithScale } from 'game/parts/PartWithScale';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';
import getCenter from './getCenter';

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
      mirrorHorizontal(ids, getCenter(ids)[0], blueprint);
    }
  } else {
    mutateBlueprint((draft) => {
      mirrorHorizontal(ids, x, draft);
    });
  }
}
