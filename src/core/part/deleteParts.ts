import { mutateBlueprint } from 'core/blueprint';
import { disposeBounds } from 'core/bounds';
import { Blueprint } from 'game/Blueprint';

export const deleteParts = (ids: string[], draft?: Blueprint) => {
  if (draft) {
    ids.forEach((id) => {
      draft.parts.delete(id);
      draft.partOrder.splice(draft.partOrder.indexOf(id), 1);
      draft.selections.splice(draft.selections.indexOf(id), 1);
    });
    disposeBounds(ids);
  } else {
    mutateBlueprint((draft) => {
      deleteParts(ids, draft);
    });
  }
};
