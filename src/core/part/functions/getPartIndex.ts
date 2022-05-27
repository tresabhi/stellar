import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import useBlueprint from 'hooks/useBlueprint';
import { AnyPart, ParentId } from 'types/Parts';
import { getPart } from './getPart';

export const getPartIndex = (
  partId: string,
  parentId: ParentId,
  state?: Blueprint,
) => {
  const parent = parentId
    ? getPart(parentId)
    : state ?? useBlueprint.getState();

  if (parentId ? parent && (parent as AnyPart).n === 'Group' : true) {
    return (parent as Group | Blueprint).partOrder.indexOf(partId);
  }
};
