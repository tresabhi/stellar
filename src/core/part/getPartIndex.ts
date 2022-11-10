import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { Part } from 'game/parts/Part';
import useBlueprint from 'stores/blueprint';
import { ParentId } from 'types/Parts';
import { getPart } from './getPart';

export const getPartIndex = (
  partId: string,
  parentId: ParentId,
  draft?: Blueprint,
) => {
  const parent = parentId
    ? getPart(parentId)
    : draft ?? useBlueprint.getState();

  if (parentId ? parent && (parent as Part).n === 'Group' : true) {
    return (parent as Group | Blueprint).part_order.indexOf(partId);
  }
};
