import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { copyParts } from './copyParts';
import { deleteParts } from './deleteParts';

export const cutParts = (ids: string[], draft?: Blueprint) => {
  if (draft) {
    copyParts(ids, draft);
    deleteParts(ids, draft);
  } else {
    mutateBlueprint((draft) => cutParts(ids, draft));
  }
};
