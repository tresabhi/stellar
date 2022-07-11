import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { hideParts } from './hideParts';

export const hidePartsBySelection = (draft?: Blueprint) => {
  if (draft) {
    hideParts(draft.selections, draft);
  } else {
    mutateBlueprint((draft) => hidePartsBySelection(draft));
  }
};
