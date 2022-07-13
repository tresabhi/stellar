import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { ungroupGroups } from './ungroupGroups';

export const ungroupGroupsBySelection = (draft?: Blueprint) => {
  if (draft) {
    ungroupGroups(draft.selections, draft);
  } else {
    mutateBlueprint((draft) => ungroupGroupsBySelection(draft));
  }
};
