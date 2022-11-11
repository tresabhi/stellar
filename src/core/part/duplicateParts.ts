import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { selectPart } from '.';
import { clonePart } from './clonePart';
import { getParent } from './getParent';
import { unselectAllParts } from './unselectAllParts';

export const duplicateParts = (ids: string[], draft?: Blueprint) => {
  if (draft) {
    unselectAllParts(draft);

    ids.forEach((id) => {
      const parent = getParent(id, draft) ?? draft;
      const partIndex = parent.part_order.indexOf(id);

      if (partIndex !== -1) {
        const clonedPartData = clonePart(id, draft);

        if (clonedPartData) {
          const [clonedPartId, clonedParts] = clonedPartData;

          parent.part_order.splice(partIndex + 1, 0, clonedPartId);

          for (const clonedPartChildId in clonedParts) {
            const clonedPart = clonedParts[clonedPartChildId];
            draft.parts[clonedPartChildId] = clonedPart;
          }

          selectPart(clonedPartId, draft);
        }
      }
    });
  } else {
    mutateBlueprint((draft) => {
      duplicateParts(ids, draft);
    });
  }
};
