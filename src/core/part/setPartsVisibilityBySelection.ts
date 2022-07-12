import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { setPartsVisibility } from './setPartsVisibility';

export const setPartsVisibilityBySelection = (
  hidden: boolean,
  draft?: Blueprint,
) => {
  if (draft) {
    setPartsVisibility(draft.selections, hidden, draft);
  } else {
    mutateBlueprint((draft) => setPartsVisibilityBySelection(hidden, draft));
  }
};
