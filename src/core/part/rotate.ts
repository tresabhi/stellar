import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import getBoundsFromParts from 'core/bounds/getBoundsFromParts';
import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { Vector2 } from 'three';
import { MethodIds } from 'types/Parts';
import normalizeAngle from 'utilities/normalizeAngle';
import normalizeArray from 'utilities/normalizeArray';
import getPart from './getPart';

export default function rotate(
  ids: MethodIds,
  z: number,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    const normalizedIds = normalizeArray(ids);
    const { bounds } = getBoundsFromParts(normalizedIds, false);
    const center = new Vector2(bounds.x, bounds.y);
    const partPosition = new Vector2();

    normalizedIds.forEach((id) => {
      const { p, o } = getPart<Part & PartWithTransformations>(id, blueprint);

      partPosition.set(p.x, p.y).rotateAround(center, z);

      p.x = partPosition.x;
      p.y = partPosition.y;
      o.z = normalizeAngle(o.z + z * (180 / Math.PI), true);
    });
  } else {
    mutateBlueprint((draft) => {
      rotate(ids, z, draft);
    });
  }
}
