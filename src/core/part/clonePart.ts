import { Group } from 'game/parts/Group';
import { cloneDeep } from 'lodash';
import { AnyPartMap } from 'types/Parts';
import { generateId } from './generateId';

/**
 * Carefully clones a part and also:
 * - Maintains the correct descendent tree
 * - Assigns new ids for all parts
 */
export const clonePart = (id: string, parts: AnyPartMap): [string, AnyPartMap] | undefined => {
  const part = parts.get(id);

  if (part) {
    const clonedPart = cloneDeep(part);
    (clonedPart.id as string) = generateId(parts);
    clonedPart.parentId = null;

    if (clonedPart.n === 'Group') {
      const clonedGroup = clonedPart as Group;
      const clonedParts: AnyPartMap = new Map([[clonedPart.id, clonedPart]]);

      clonedGroup.part_order.forEach((childId, index) => {
        const child = parts.get(childId);

        if (child) {
          const clonedGroupChildData = clonePart(child.id, parts);

          if (clonedGroupChildData) {
            const [clonedGroupChildId, clonedGroupChildrenParts] = clonedGroupChildData;
            const clonedGroupChild = clonedGroupChildrenParts.get(clonedGroupChildId);

            clonedGroup.part_order[index] = clonedGroupChildId;

            if (clonedGroupChild) {
              clonedGroupChild.parentId = clonedGroup.id;
            }
            clonedGroupChildrenParts.forEach((part, id) => {
              clonedParts.set(id, part);
            });
          }
        }
      });

      return [clonedGroup.id, clonedParts];
    } else {
      return [clonedPart.id, new Map([[clonedPart.id, clonedPart]])];
    }
  }
};
