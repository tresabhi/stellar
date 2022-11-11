import { mutateApp } from 'core/app/mutateApp';
import { mutateBlueprint } from 'core/blueprint';
import { Group } from 'game/parts/Group';
import useApp from 'stores/app';
import { Snippet } from 'stores/snippets';
import { clonePart } from './clonePart';
import { selectPartsOnly } from './selectPartsOnly';

export const pasteParts = () => {
  const {
    editor: { clipboard },
  } = useApp.getState();

  if (clipboard) {
    mutateBlueprint((draft) => {
      const firstSelection = draft.selections[0];
      const parentId = draft.parts[firstSelection].parent_id;
      const parent = parentId
        ? (draft.parts[parentId] as Group) ?? draft
        : draft;
      const insertIndex = firstSelection
        ? parent.part_order.indexOf(firstSelection)
        : 0;

      for (const partId in clipboard.parts) {
        const part = clipboard.parts[partId];

        draft.parts[partId] = {
          ...part,
          parent_id: parentId,
        };
      }
      parent.part_order.splice(insertIndex, 0, ...clipboard.part_order);
      selectPartsOnly(clipboard.part_order, draft);
    });

    mutateApp((draft) => {
      const newClipboard: Snippet = {
        parts: {},
        part_order: [],
      };

      clipboard.part_order.forEach((partId) => {
        const clonedPartData = clonePart(partId, clipboard);

        if (clonedPartData) {
          const [clonedPartId, clonedParts] = clonedPartData;
          newClipboard.part_order.push(clonedPartId);

          for (const clonedChildPartId in clonedParts) {
            const clonedChildPart = clonedParts[clonedChildPartId];
            newClipboard.parts[clonedChildPartId] = clonedChildPart;
          }
        }
      });

      if (
        newClipboard.part_order.length > 0 &&
        Object.keys(newClipboard.parts).length > 0
      ) {
        draft.editor.clipboard = newClipboard;
      }
    });
  }
};
