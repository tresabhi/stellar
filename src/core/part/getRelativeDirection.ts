import { Group } from 'game/parts/Group';
import useBlueprint from 'stores/blueprint';
import lastIntersection from 'utilities/lastIntersection';
import getAncestry from './getAncestry';

export enum RelativeDirection {
  Up,
  Same,
  Down,
}

export default function getRelativeDirection(
  originId: string,
  targetId: string,
  blueprint = useBlueprint.getState(),
) {
  const originAncestry = getAncestry(originId, true, blueprint);
  const targetAncestry = getAncestry(targetId, true, blueprint);
  const lastMutualAncestorId = lastIntersection(originAncestry, targetAncestry);
  const lastMutualAncestorIdIndex =
    lastMutualAncestorId === undefined
      ? -1
      : originAncestry.indexOf(lastMutualAncestorId);
  const firstVaryingOriginAncestorId =
    originAncestry[lastMutualAncestorIdIndex + 1];
  const firstVaryingTargetAncestorId =
    targetAncestry[lastMutualAncestorIdIndex + 1];
  const lastMutualAncestor = lastMutualAncestorId
    ? (blueprint.parts[lastMutualAncestorId] as Group)
    : blueprint;
  const firstVaryingOriginAncestorIdIndex =
    lastMutualAncestor.part_order.indexOf(firstVaryingOriginAncestorId);
  const firstVaryingTargetAncestorIdIndex =
    lastMutualAncestor.part_order.indexOf(firstVaryingTargetAncestorId);

  if (firstVaryingOriginAncestorIdIndex === firstVaryingTargetAncestorIdIndex) {
    return RelativeDirection.Same;
  }
  if (firstVaryingOriginAncestorIdIndex < firstVaryingTargetAncestorIdIndex) {
    return RelativeDirection.Down;
  }
  return RelativeDirection.Up;
}
