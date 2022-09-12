import { mutateBlueprint } from 'core/blueprint';
import { disposeBounds } from 'core/bounds';
import { Blueprint } from 'game/Blueprint';
import { getParent } from './getParent';

export const deleteParts = (ids: string[], draft?: Blueprint) => {
  if (draft) {
    ids.forEach((id) => {
      const parent = getParent(id, draft) ?? draft;
      const selectionIndex = draft.selections.indexOf(id);

      draft.parts.delete(id);

      if (selectionIndex !== -1) draft.selections.splice(selectionIndex, 1);
      if (parent) parent.part_order.splice(parent.part_order.indexOf(id), 1);
    });

    // TODO: dispose bounds in the part layout component on unrender (useEffect(() => () => { ... }))
    disposeBounds(ids);
  } else {
    mutateBlueprint((draft) => {
      deleteParts(ids, draft);
    });
  }
};
