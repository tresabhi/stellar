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
        const clonedPartData = clonePart(id, draft.parts);

        if (clonedPartData) {
          const [clonedPartId, clonedParts] = clonedPartData;

          parent.part_order.splice(partIndex + 1, 0, clonedPartId);
          clonedParts.forEach((clonedPart, clonedPartChildId) => {
            draft.parts.set(clonedPartChildId, clonedPart);
          });

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
