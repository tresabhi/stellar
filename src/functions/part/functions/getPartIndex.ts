import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import blueprintStore from 'stores/blueprint';
import { AnyPart, ParentID, UUID } from 'types/Parts';
import { getPart } from './getPart';

export const getPartIndex = (
  partID: UUID,
  parentID: ParentID,
  state?: Blueprint,
) => {
  const parent = parentID
    ? getPart(parentID)
    : state ?? blueprintStore.getState();

  if (parentID ? parent && (parent as AnyPart).n === 'Group' : true) {
    return (parent as Group | Blueprint).partOrder.indexOf(partID);
  }
};
