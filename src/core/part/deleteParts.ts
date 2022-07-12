import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';

export const deleteParts = (ids: string[], draft?: Blueprint) => {
  if (draft) {
    draft.selections.forEach((selection) => {
      draft.parts.delete(selection);
      draft.partOrder.splice(draft.partOrder.indexOf(selection), 1);
    });
  } else {
    mutateBlueprint((draft) => {
      deleteParts(ids, draft);
    });
  }
};
