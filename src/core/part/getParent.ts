import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import useBlueprint from 'stores/blueprint';
import { getPart } from '.';
import { getParentId } from './getParentId';

export const getParent = (id: string, draft?: Blueprint) => {
  if (draft) {
    const parentId = getParentId(id);

    if (parentId) return getPart<Group>(parentId, draft);
  } else {
    getParent(id, useBlueprint.getState());
  }
};
