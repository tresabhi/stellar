import { Group } from 'game/parts/Group';
import { Part } from 'game/parts/Part';
import { cloneDeep } from 'lodash';
import { Snippet } from 'stores/snippets';
import generatePartId from './generatePartId';

/**
 * Carefully clones a part and also:
 * - Maintains the correct descendent tree
 * - Assigns new ids for all parts
 */
export default function clone(
  id: string,
  blueprint: Snippet,
): [string, Record<string, Part>] {
  const part = blueprint.parts[id];

  const clonedPart = cloneDeep(part);
  (clonedPart.id as string) = generatePartId(blueprint.parts);
  clonedPart.parent = null;
  clonedPart.selected = false;

  if (clonedPart.n === 'Group') {
    const clonedGroup = clonedPart as Group;
    const clonedParts: Record<string, Part> = { [clonedPart.id]: clonedPart };

    clonedGroup.part_order.forEach((childId, index) => {
      const child = blueprint.parts[childId] as Group;

      if (child) {
        const clonedGroupChildData = clone(child.id, blueprint);

        if (clonedGroupChildData) {
          const [clonedGroupChildId, clonedGroupChildrenParts] =
            clonedGroupChildData;
          const clonedGroupChild = clonedGroupChildrenParts[clonedGroupChildId];

          clonedGroup.part_order[index] = clonedGroupChildId;

          if (clonedGroupChild) {
            clonedGroupChild.parent = clonedGroup.id;
          }

          Object.keys(clonedGroupChildrenParts).forEach(
            (clonedGroupChildrenPartId) => {
              const clonedGroupChildrenPart =
                clonedGroupChildrenParts[clonedGroupChildrenPartId];
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
