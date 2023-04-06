import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { MethodIds } from 'types/Parts';
import normalizeAngleDeg from 'utilities/normalizeAngleDeg';
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
          const positionOffset = (part as PartWithTransformations).p.x - x;
          (part as PartWithTransformations).p.x -= positionOffset * 2;
          (part as PartWithTransformations).o.x *= -1;
          (part as PartWithTransformations).o.z = normalizeAngleDeg(
            -(part as PartWithTransformations).o.z,
          );
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
