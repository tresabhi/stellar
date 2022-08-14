import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { selectParts, unselectAllParts } from '.';
import { getParent } from './getParent';

export const ungroupGroups = (ids: string[], draft?: Blueprint) => {
  if (draft) {
    unselectAllParts(draft);

    ids.forEach((id) => {
      const part = draft.parts.get(id);

      if (part && part.n === 'Group') {
        const group = part as Group;
        const parent = getParent(id, draft) ?? draft;
        const insertIndex = parent.part_order.indexOf(group.id);
        const chunkBefore = parent.part_order.splice(0, insertIndex);
        const chunkAfter = parent.part_order.splice(
          1,
          parent.part_order.length - 1,
        );

        group.part_order.forEach((childId) => {
          const child = draft.parts.get(childId);
          if (child) child.parentId = group.parentId;
        });
        parent.part_order = [
          ...chunkBefore,
          ...group.part_order,
          ...chunkAfter,
        ];
        draft.parts.delete(group.id);
        selectParts(group.part_order, draft);
      }
    });
  } else {
    mutateBlueprint((draft) => ungroupGroups(ids, draft));
  }
};
