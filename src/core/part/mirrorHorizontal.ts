import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { Part } from 'game/parts/Part';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { MethodIds } from 'types/Parts';
import normalizeAngle from 'utilities/normalizeAngle';
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
          const positionOffset =
            (part as Part & PartWithTransformations).p.x - x;
          (part as Part & PartWithTransformations).p.x -= positionOffset * 2;
          (part as Part & PartWithTransformations).o.x *= -1;
          (part as Part & PartWithTransformations).o.z = normalizeAngle(
            -(part as Part & PartWithTransformations).o.z,
            true,
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
