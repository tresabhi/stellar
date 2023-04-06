import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { MethodIds } from 'types/Parts';
import normalizeAngleDeg from 'utilities/normalizeAngleDeg';
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
          const offset = (part as PartWithTransformations).p.y - y;
          (part as PartWithTransformations).p.y -= offset * 2;
          (part as PartWithTransformations).o.y *= -1;
          (part as PartWithTransformations).o.z = normalizeAngleDeg(
            -(part as PartWithTransformations).o.z,
          );
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
