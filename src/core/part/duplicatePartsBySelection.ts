import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { duplicateParts } from './duplicateParts';

export const duplicatePartsBySelection = (draft?: Blueprint) => {
  if (draft) {
    duplicateParts(draft.selections, draft);
  } else {
    mutateBlueprint((draft) => {
      duplicatePartsBySelection(draft);
    });
  }
};
