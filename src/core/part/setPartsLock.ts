import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';

export const setPartsLock = (
  ids: string[],
  locked: boolean,
  draft?: Blueprint,
) => {
  if (draft) {
    ids.forEach((id) => {
      draft.parts[id].locked = locked;
    });
  } else {
    mutateBlueprint((draft) => setPartsLock(ids, locked, draft));
  }
};
