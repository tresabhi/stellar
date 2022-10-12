import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { mutateParts } from './mutateParts';

export const selectPartsOnly = (
  ids: string[],
  draft?: Blueprint,
  expandGroups?: boolean,
) => {
  if (draft) {
    mutateParts(
      draft.selections,
      (draft) => {
        draft.selected = false;
      },
      draft,
    );
    mutateParts(
      ids,
      (draft) => {
        draft.selected = true;
        if (expandGroups && draft.n === 'Group') {
          (draft as Group).expanded = true;
        }
      },
      draft,
    );

    draft.selections = ids;
  } else {
    mutateBlueprint((draft) => {
      selectPartsOnly(ids, draft);
    });
  }
};
