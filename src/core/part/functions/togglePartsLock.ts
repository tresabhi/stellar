import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { mutateParts } from './mutateParts';

export const togglePartsLock = (ids: string[], draft?: Blueprint) => {
  if (draft) {
    const firstLock = draft.parts.get(ids[0])?.locked ?? true;
    const isMixed = ids.some((id) => draft.parts.get(id)?.locked !== firstLock);

    mutateParts(
      ids,
      (draft) => (draft.locked = isMixed ? false : !firstLock),
      draft,
    );
  } else {
    mutateBlueprint((draft) => togglePartsLock(ids, draft));
  }
};
