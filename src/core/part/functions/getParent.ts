import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { UUID } from 'types/Parts';
import { getParentID } from './getParentID';
import { getPart } from './getPart';

export const getParent = (ID: UUID, state?: Blueprint): Group | undefined => {
  const parentID = getParentID(ID);

  if (parentID) return getPart<Group>(parentID, state);
};
