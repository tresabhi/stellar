import { Blueprint } from 'game/Blueprint';
import { copyParts } from './copyParts';
import { deleteParts } from './deleteParts';

export const cutParts = (ids: string[], draft?: Blueprint) => {
  copyParts(ids, draft);
  deleteParts(ids, draft);
};
