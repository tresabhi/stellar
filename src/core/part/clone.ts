import { Group } from 'game/parts/Group';
import { Part } from 'game/parts/Part';
import { cloneDeep } from 'lodash';
import { Snippet } from 'stores/snippets';
import generateId from './generateId';

/**
 * Carefully clones a part and also:
 * - Maintains the correct descendent tree
 * - Assigns new ids for all parts
 */
export default function clone(
  id: string,
  draft: Snippet,
): [string, Record<string, Part>] {
  const part = draft.parts[id];

  const clonedPart = cloneDeep(part);
  (clonedPart.id as string) = generateId(draft.parts);
  clonedPart.parent_id = null;

  if (clonedPart.n === 'Group') {
    const clonedGroup = clonedPart as Group;
    const clonedParts: Record<string, Part> = { [clonedPart.id]: clonedPart };

    clonedGroup.part_order.forEach((childId, index) => {
      const child = draft.parts[childId] as Group;

      if (child) {
        const clonedGroupChildData = clone(child.id, draft);

        if (clonedGroupChildData) {
          const [clonedGroupChildId, clonedGroupChildrenParts] = clonedGroupChildData;
          const clonedGroupChild = clonedGroupChildrenParts[clonedGroupChildId];

          clonedGroup.part_order[index] = clonedGroupChildId;

          if (clonedGroupChild) {
            clonedGroupChild.parent_id = clonedGroup.id;
          }

          Object.keys(clonedGroupChildrenParts).forEach(
            (clonedGroupChildrenPartId) => {
              const clonedGroupChildrenPart = clonedGroupChildrenParts[clonedGroupChildrenPartId];
              clonedParts[clonedGroupChildrenPartId] = clonedGroupChildrenPart;
            },
          );
        }
      }
    });

    return [clonedGroup.id, clonedParts];
  }
  return [clonedPart.id, { [clonedPart.id]: clonedPart }];
}
