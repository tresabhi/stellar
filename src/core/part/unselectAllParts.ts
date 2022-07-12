import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { mutateParts } from './mutateParts';

export const unselectAllParts = (draft?: Blueprint) => {
  if (draft) {
    mutateParts(
      draft.selections,
      (draft) => {
        draft.selected = false;
      },
      draft,
    );
    draft.selections = [];
  } else {
    mutateBlueprint((draft) => unselectAllParts(draft));
  }
};
