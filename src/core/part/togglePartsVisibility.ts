import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { mutateParts } from './mutateParts';

export const togglePartsVisibility = (ids: string[], draft?: Blueprint) => {
  if (draft) {
    const firstHidden = draft.parts[ids[0]].hidden ?? true;
    const isMixed = ids.some((id) => draft.parts[id].hidden !== firstHidden);

    mutateParts(
      ids,
      (draft) => {
        draft.hidden = isMixed ? false : !firstHidden;
      },
      draft,
    );
  } else {
    mutateBlueprint((draft) => togglePartsVisibility(ids, draft));
  }
};
