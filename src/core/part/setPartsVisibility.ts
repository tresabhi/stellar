import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';

export const setPartsVisibility = (
  ids: string[],
  hidden: boolean,
  draft?: Blueprint,
) => {
  if (draft) {
    ids.forEach((id) => {
      draft.parts[id].hidden = hidden;
    });
  } else {
    mutateBlueprint((draft) => setPartsVisibility(ids, hidden, draft));
  }
};
