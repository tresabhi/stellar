import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import useBlueprint from 'stores/blueprint';
import getParentId from './getParentId';
import getPart from './getPart';

export default function getParent(
  id: string,
  blueprint?: Blueprint,
): Group | null {
  if (blueprint) {
    const parentId = getParentId(id);

    if (parentId) return getPart<Group>(parentId, blueprint);
    return null;
  }
  return getParent(id, useBlueprint.getState());
}
