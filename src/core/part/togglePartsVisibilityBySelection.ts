import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { togglePartsVisibility } from './togglePartsVisibility';

export const togglePartsVisibilityBySelection = (draft?: Blueprint) => {
  if (draft) {
    togglePartsVisibility(draft.selections, draft);
  } else {
    mutateBlueprint((draft) => togglePartsVisibilityBySelection(draft));
  }
};
