import { Blueprint } from 'game/Blueprint';
import useApp from 'hooks/useApp';
import useBlueprint from 'hooks/useBlueprint';
import { Snippet } from 'hooks/useSnippets';
import { clonePart } from './clonePart';

export const copyParts = (ids: string[], draft?: Blueprint) => {
  if (draft) {
    const clipboard: Snippet = {
      parts: new Map(),
      partOrder: [],
    };

    ids.forEach((id) => {
      const part = draft.parts.get(id);

      if (part) {
        const clonedPartData = clonePart(part.id, draft.parts);

        if (clonedPartData) {
          const [clonedPartId, clonedParts] = clonedPartData;
          clipboard.partOrder.push(clonedPartId);
          clonedParts.forEach((clonedPart, clonedPartChildId) => {
            clipboard.parts.set(clonedPartChildId, clonedPart);
          });
        }
      }
    });

    if (clipboard.parts.size > 0 && clipboard.partOrder.length > 0) {
      useApp.setState({ clipboard });
    } else {
      useApp.setState({ clipboard: undefined });
    }
  } else {
    copyParts(ids, useBlueprint.getState());
  }
};
