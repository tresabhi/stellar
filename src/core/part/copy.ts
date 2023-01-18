import mutateApp from 'core/app/mutateApp';
import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'stores/blueprint';
import { Snippet } from 'stores/snippets';
import clone from './clone';

export default function copy(ids: string[], blueprint?: Blueprint) {
  if (blueprint) {
    const clipboard: Snippet = {
      parts: {},
      part_order: [],
    };

    ids.forEach((id) => {
      const part = blueprint.parts[id];
      const clonedPartData = clone(part.id, blueprint);

      if (clonedPartData) {
        const [clonedPartId, clonedParts] = clonedPartData;
        clipboard.part_order.push(clonedPartId);

        Object.keys(clonedParts).forEach((clonedPartChildId) => {
          const clonedPart = clonedParts[clonedPartChildId];
          clipboard.parts[clonedPartChildId] = clonedPart;
        });
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
    copy(ids, useBlueprint.getState());
  }
}
