import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { UUID } from 'types/Parts';
import { mutateParts } from './mutateParts';

export const selectPartsOnly = (IDs: UUID[], draft?: Blueprint) => {
  if (draft) {
    mutateParts(
      draft.selections,
      (draft) => {
        draft.selected = false;
      },
      draft,
    );
    mutateParts(
      IDs,
      (draft) => {
        draft.selected = true;
        if (draft.n === 'Group') (draft as Group).expanded = true;
      },
      draft,
    );

    draft.selections = IDs;
  } else {
    mutateBlueprint((draft) => {
      selectPartsOnly(IDs, draft);
    });
  }
};
