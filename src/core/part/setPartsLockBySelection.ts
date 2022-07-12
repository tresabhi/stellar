import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { setPartsLock } from './setPartsLock';

export const setPartsLockBySelection = (locked: boolean, draft?: Blueprint) => {
  if (draft) {
    setPartsLock(draft.selections, locked, draft);
  } else {
    mutateBlueprint((draft) => setPartsLockBySelection(locked, draft));
  }
};
