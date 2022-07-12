import { Blueprint } from 'game/Blueprint';
import useApp, { ClipboardItem } from 'hooks/useApp';
import useBlueprint from 'hooks/useBlueprint';
import { isolatePart } from './isolatePart';

export const copyPartsToClipboard = (ids: string[], draft?: Blueprint) => {
  if (draft) {
    const clipboard: ClipboardItem = {
      parts: new Map(),
      partOrder: [],
    };

    ids.forEach((id) => {
      const part = draft.parts.get(id);

      if (part) {
        const [isolatedPartId, isolatedParts] = isolatePart(part, draft);
        clipboard.partOrder.push(isolatedPartId),
          isolatedParts.forEach((isolatedPart) => {
            clipboard.parts.set(isolatedPart.id, isolatedPart);
          });
      }
    });

    useApp.setState({ clipboard });
  } else {
    copyPartsToClipboard(ids, useBlueprint.getState());
  }
};
