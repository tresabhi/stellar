import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';

export const unselectParts = (ids: string[], draft?: Blueprint) => {
  if (draft) {
    ids.forEach((id) => {
      draft.parts[id].selected = false;
    });

    draft.selections = draft.selections.filter(
      (selection) => !ids.includes(selection),
    );
  } else {
    mutateBlueprint((draft) => {
      unselectParts(ids, draft);
    });
  }
};
