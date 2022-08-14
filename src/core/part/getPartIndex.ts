import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import useBlueprint from 'stores/useBlueprint';
import { AnyPart, ParentId } from 'types/Parts';
import { getPart } from './getPart';

export const getPartIndex = (
  partId: string,
  parentId: ParentId,
  draft?: Blueprint,
) => {
  const parent = parentId
    ? getPart(parentId)
    : draft ?? useBlueprint.getState();

  if (parentId ? parent && (parent as AnyPart).n === 'Group' : true) {
    return (parent as Group | Blueprint).part_order.indexOf(partId);
  }
};
