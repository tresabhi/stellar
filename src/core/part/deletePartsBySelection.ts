import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { getParent } from './getParent';

// fork of `deleteParts` for selections splicing optimization
export const deletePartsBySelection = (draft?: Blueprint) => {
  if (draft) {
    [...draft.selections].forEach((selection) => {
      const parent = getParent(selection, draft) ?? draft;

      delete draft.parts[selection];

      if (parent) {
        parent.part_order.splice(parent.part_order.indexOf(selection), 1);
      }
    });

    draft.selections = [];
  } else {
    mutateBlueprint((draft) => {
      deletePartsBySelection(draft);
    });
  }
};
