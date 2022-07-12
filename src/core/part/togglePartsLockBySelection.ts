import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { togglePartsLock } from './togglePartsLock';

export const togglePartsLockBySelection = (draft?: Blueprint) => {
  if (draft) {
    togglePartsLock(draft.selections, draft);
  } else {
    mutateBlueprint((draft) => togglePartsLockBySelection(draft));
  }
};
