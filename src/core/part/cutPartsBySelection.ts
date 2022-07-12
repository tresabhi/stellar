import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { cutParts } from './cutParts';

export const cutPartsBySelection = (draft?: Blueprint) => {
  if (draft) {
    cutParts(draft.selections, draft);
  } else {
    mutateBlueprint((draft) => cutPartsBySelection(draft));
  }
};
