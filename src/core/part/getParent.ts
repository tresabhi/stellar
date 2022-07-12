import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { getParentId } from './getParentId';

export const getParent = (id: string, draft?: Blueprint): Group | undefined => {
  const parentId = getParentId(id);

  if (parentId) return draft?.parts.get(parentId) as Group;
};
