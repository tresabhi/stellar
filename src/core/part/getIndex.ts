import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import useBlueprint from 'stores/blueprint';
import { ParentId } from 'types/Parts';
import getPart from './getPart';

export default function getIndex(
  id: string,
  parentId: ParentId,
  blueprint?: Blueprint,
) {
  const parent = parentId
    ? getPart(parentId)
    : blueprint ?? useBlueprint.getState();

  return (parent as Group | Blueprint).part_order.indexOf(id);
}
