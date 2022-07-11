import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { mutateParts } from './mutateParts';

export const togglePartsVisibility = (ids: string[], draft?: Blueprint) => {
  if (draft) {
    const isOneVisible = ids.some((id) => !draft.parts.get(id)?.hidden);

    mutateParts(
      ids,
      (draft) => {
        // hide all if even one is visible; make all visible if all are hidden
        draft.hidden = isOneVisible;
      },
      draft,
    );
  } else {
    mutateBlueprint((draft) => togglePartsVisibility(ids, draft));
  }
};
