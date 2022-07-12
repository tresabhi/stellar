import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { cloneDeep } from 'lodash';
import { AnyPart } from 'types/Parts';
import { generateId } from './generateId';

export const isolatePart = (
  part: AnyPart,
  draft: Blueprint,
): [string, AnyPart[]] => {
  const clonedPart = cloneDeep(part);
  (clonedPart.id as string) = generateId(draft);
  clonedPart.parentId = null;

  if (clonedPart.n === 'Group') {
    const clonedGroup = clonedPart as Group;
    const parts: AnyPart[] = [];

    clonedGroup.partOrder.forEach((groupChildId, index) => {
      const groupChild = draft.parts.get(groupChildId);

      if (groupChild) {
        const [isolatedChildId, isolatedChildrenParts] = isolatePart(
          groupChild,
          draft,
        );
        clonedGroup.partOrder[index] = isolatedChildId;
        parts.push(...isolatedChildrenParts);
      }
    });

    return [clonedGroup.id, parts];
  } else {
    return [clonedPart.id, [clonedPart]];
  }
};
