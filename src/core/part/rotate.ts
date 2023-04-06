import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import getBoundsFromParts from 'core/bounds/getBoundsFromParts';
import { Blueprint } from 'game/Blueprint';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { Vector2 } from 'three';
import { MethodIds } from 'types/Parts';
import normalizeAngleDeg from 'utilities/normalizeAngleDeg';
import normalizeIds from 'utilities/normalizeIds';
import getPart from './getPart';

export default function rotate(
  ids: MethodIds,
  z: number,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    const normalizedIds = normalizeIds(ids);
    const { bounds } = getBoundsFromParts(normalizedIds, false);
    const center = new Vector2(bounds.x, bounds.y);
    const partPosition = new Vector2();

    normalizedIds.forEach((id) => {
      const { p, o } = getPart<PartWithTransformations>(id, blueprint);

      partPosition.set(p.x, p.y).rotateAround(center, z);

      p.x = partPosition.x;
      p.y = partPosition.y;
      o.z = normalizeAngleDeg(o.z + z * (180 / Math.PI));
    });
  } else {
    mutateBlueprint((draft) => {
      rotate(ids, z, draft);
    });
  }
}
