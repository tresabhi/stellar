import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'hooks/useBlueprint';
import { copyPartsToClipboard } from './copyPartsToClipboard';

export const copyPartsToClipboardBySelection = (draft?: Blueprint) => {
  if (draft) {
    copyPartsToClipboard(draft.selections, draft);
  } else {
    copyPartsToClipboardBySelection(useBlueprint.getState());
  }
};
