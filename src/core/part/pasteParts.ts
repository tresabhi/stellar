import { mutateApp } from 'core/app/mutateApp';
import { mutateBlueprint } from 'core/blueprint';
import { Group } from 'game/parts/Group';
import useApp from 'stores/useApp';
import { Snippet } from 'stores/useSnippets';
import { clonePart } from './clonePart';
import { selectPartsOnly } from './selectPartsOnly';

export const pasteParts = () => {
  const {
    editor: { clipboard },
  } = useApp.getState();

  if (clipboard) {
    mutateBlueprint((draft) => {
      const firstSelection = draft.selections[0];
      const parentId = draft.parts.get(firstSelection)?.parentId ?? null;
      const parent = parentId
        ? (draft.parts.get(parentId) as Group) ?? draft
        : draft;
      const insertIndex = firstSelection
        ? parent.part_order.indexOf(firstSelection)
        : 0;

      clipboard.parts.forEach((part, partId) => {
        draft.parts.set(partId, {
          ...part,
          parentId,
        });
      });
      parent.part_order.splice(insertIndex, 0, ...clipboard.part_order);
      selectPartsOnly(clipboard.part_order, draft);
    });

    mutateApp((draft) => {
      const newClipboard: Snippet = {
        parts: new Map(),
        part_order: [],
      };

      clipboard.part_order.forEach((partId) => {
        const clonedPartData = clonePart(partId, clipboard.parts);

        if (clonedPartData) {
          const [clonedPartId, clonedParts] = clonedPartData;
          newClipboard.part_order.push(clonedPartId);
          clonedParts.forEach((clonedChildPart, clonedChildPartId) => {
            newClipboard.parts.set(clonedChildPartId, clonedChildPart);
          });
        }
      });

      if (newClipboard.part_order.length > 0 && newClipboard.parts.size > 0) {
        draft.editor.clipboard = newClipboard;
      }
    });
  }
};
