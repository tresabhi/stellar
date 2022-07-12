import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';

export const setPartsLock = (
  ids: string[],
  locked: boolean,
  draft?: Blueprint,
) => {
  if (draft) {
    ids.forEach((id) => {
      const part = draft.parts.get(id);

      if (part) {
        part.locked = locked;
      }
    });
  } else {
    mutateBlueprint((draft) => setPartsLock(ids, locked, draft));
  }
};
