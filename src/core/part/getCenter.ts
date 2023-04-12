import getBoundsFromParts from 'core/bounds/getBoundsFromParts';
import { Vector2Tuple } from 'three';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';

export default function getCenter(
  ids: MethodIds,
  useMutualAngle?: boolean,
): Vector2Tuple {
  const { bounds } = getBoundsFromParts(normalizeIds(ids), useMutualAngle);
  return [bounds.x, bounds.y];
}
