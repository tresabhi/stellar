import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { groupParts } from './groupParts';

export const groupPartsBySelection = (draft?: Blueprint) => {
  if (draft && draft.selections.length > 0) {
    groupParts(
      draft.selections,
      draft.selections[draft.selections.length - 1],
      draft,
    );
  } else {
    mutateBlueprint((draft) => {
      groupPartsBySelection(draft);
    });
  }
};
