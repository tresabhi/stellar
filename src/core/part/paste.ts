import mutateApp from 'core/app/mutateApp';
import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Group } from 'game/parts/Group';
import useApp from 'stores/app';
import { Snippet } from 'stores/snippets';
import clone from './clone';
import selectConcurrent from './selectConcurrent';

export default function paste() {
  const { clipboard } = useApp.getState().editor;

  if (clipboard) {
    mutateBlueprint((draft) => {
      const firstSelection = draft.part_selections[0];
      const parentId = draft.parts[firstSelection].parent;
      const parent = parentId
        ? (draft.parts[parentId] as Group) ?? draft
        : draft;
      const insertIndex = firstSelection
        ? parent.part_order.indexOf(firstSelection)
        : 0;

      Object.keys(clipboard.parts).forEach((partId) => {
        const part = clipboard.parts[partId];

        draft.parts[partId] = {
          ...part,
          parent: parentId,
        };
      });
      parent.part_order.splice(insertIndex, 0, ...clipboard.part_order);
      selectConcurrent(clipboard.part_order, draft);
    });

    mutateApp((draft) => {
      const newClipboard: Snippet = {
        parts: {},
        part_order: [],
      };

      clipboard.part_order.forEach((partId) => {
        const clonedPartData = clone(partId, clipboard);

        if (clonedPartData) {
          const [clonedPartId, clonedParts] = clonedPartData;
          newClipboard.part_order.push(clonedPartId);

          Object.keys(clonedParts).forEach((clonedChildPartId) => {
            const clonedChildPart = clonedParts[clonedChildPartId];
            newClipboard.parts[clonedChildPartId] = clonedChildPart;
          });
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
}
