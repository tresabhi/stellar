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
        const insertIndex = parent.partOrder.indexOf(group.id);
        const chunkBefore = parent.partOrder.splice(0, insertIndex);
        const chunkAfter = parent.partOrder.splice(
          1,
          parent.partOrder.length - 1,
        );

        group.partOrder.forEach((childId) => {
          const child = draft.parts.get(childId);
          if (child) child.parentId = group.parentId;
        });
        parent.partOrder = [...chunkBefore, ...group.partOrder, ...chunkAfter];
        draft.parts.delete(group.id);
        selectParts(group.partOrder, draft);
      }
    });
  } else {
    mutateBlueprint((draft) => ungroupGroups(ids, draft));
  }
};
