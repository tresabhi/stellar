import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { UUID } from 'types/Parts';
import { getPart } from './getPart';
import { getParentID } from './getParentID';

export const getPartParent = (
  ID: UUID,
  state?: Blueprint,
): Group | undefined => {
  const parentID = getParentID(ID);

  if (parentID) return getPart<Group>(parentID, state);
};
