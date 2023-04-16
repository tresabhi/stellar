import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { Part } from 'game/parts/Part';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { MethodIds } from 'types/Parts';
import normalizeAngle from 'utilities/normalizeAngle';
import normalizeArray from 'utilities/normalizeArray';
import getCenter from './getCenter';

export default function mirrorVertical(
  ids: MethodIds,
  y?: number,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    if (y) {
      normalizeArray(ids).forEach((id) => {
        const part = blueprint.parts[id];

        if (part.n === 'Group') {
          mirrorVertical((part as Group).part_order, y, blueprint);
        } else {
          const offset = (part as Part & PartWithTransformations).p.y - y;
          (part as Part & PartWithTransformations).p.y -= offset * 2;
          (part as Part & PartWithTransformations).o.y *= -1;
          (part as Part & PartWithTransformations).o.z = normalizeAngle(
            -(part as Part & PartWithTransformations).o.z,
            true,
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
