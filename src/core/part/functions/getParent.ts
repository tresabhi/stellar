import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { getParentId } from './getParentId';
import { getPart } from './getPart';

export const getParent = (id: string, state?: Blueprint): Group | undefined => {
  const parentId = getParentId(id);

  if (parentId) return getPart<Group>(parentId, state);
};
