import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'stores/blueprint';
import { copyParts } from './copyParts';

export const copyPartsBySelection = (draft?: Blueprint) => {
  if (draft) {
    copyParts(draft.selections, draft);
  } else {
    copyPartsBySelection(useBlueprint.getState());
  }
};
