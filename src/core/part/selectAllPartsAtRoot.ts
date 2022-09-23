import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { selectParts } from './selectParts';
import { unselectAllParts } from './unselectAllParts';

export const selectAllPartsAtRoot = (draft?: Blueprint) => {
  if (draft) {
    if (draft.selections.length > 0) {
      unselectAllParts(draft);
    }

    if (draft.part_order.length > 0) {
      selectParts(draft.part_order, draft);
    }
  } else {
    mutateBlueprint((draft) => {
      selectAllPartsAtRoot(draft);
    });
  }
};
