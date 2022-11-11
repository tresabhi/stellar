import { mutateApp } from 'core/app/mutateApp';
import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'stores/blueprint';
import { Snippet } from 'stores/snippets';
import { clonePart } from './clonePart';

export const copyParts = (ids: string[], draft?: Blueprint) => {
  if (draft) {
    const clipboard: Snippet = {
      parts: {},
      part_order: [],
    };

    ids.forEach((id) => {
      const part = draft.parts[id];
      const clonedPartData = clonePart(part.id, draft);

      if (clonedPartData) {
        const [clonedPartId, clonedParts] = clonedPartData;
        clipboard.part_order.push(clonedPartId);

        for (const clonedPartChildId in clonedParts) {
          const clonedPart = clonedParts[clonedPartChildId];
          clipboard.parts[clonedPartChildId] = clonedPart;
        }
      }
    });

    if (
      Object.keys(clipboard.parts).length > 0 &&
      clipboard.part_order.length > 0
    ) {
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
