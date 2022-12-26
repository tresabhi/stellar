import { Group } from 'game/parts/Group';
import useBlueprint from 'stores/blueprint';
import { MethodIds } from 'types/Parts';
import getPart from './getPart';

export default function getChildrenRecursive(
  ids: MethodIds,
  blueprint = useBlueprint.getState(),
) {
  const indexedIds: string[] = [];

  if (typeof ids === 'string') {
    const part = getPart(ids, blueprint);

    if (part.n === 'Group') {
      (part as Group).part_order.forEach((childId) => {
        indexedIds.push(...getChildrenRecursive(childId));
      });

      return indexedIds;
    }
    return [ids];
  }

  ids.forEach((id) => {
    indexedIds.push(...getChildrenRecursive(id));
  });
  return indexedIds;
}
