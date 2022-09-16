import { mutateApp } from 'core/app/mutateApp';
import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'stores/useBlueprint';
import { Snippet } from 'stores/useSnippets';
import { clonePart } from './clonePart';

export const copyParts = (ids: string[], draft?: Blueprint) => {
  if (draft) {
    const clipboard: Snippet = {
      parts: new Map(),
      part_order: [],
    };

    ids.forEach((id) => {
      const part = draft.parts.get(id);

      if (part) {
        const clonedPartData = clonePart(part.id, draft);

        if (clonedPartData) {
          const [clonedPartId, clonedParts] = clonedPartData;
          clipboard.part_order.push(clonedPartId);
          clonedParts.forEach((clonedPart, clonedPartChildId) => {
            clipboard.parts.set(clonedPartChildId, clonedPart);
          });
        }
      }
    });

    if (clipboard.parts.size > 0 && clipboard.part_order.length > 0) {
      mutateApp((draft) => {
        draft.editor.clipboard = clipboard;
      });
    } else {
      mutateApp((draft) => delete draft.editor.clipboard);
    }
  } else {
    copyParts(ids, useBlueprint.getState());
  }
};
