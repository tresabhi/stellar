import { Blueprint } from 'game/Blueprint';
import { deleteParts } from './deleteParts';

export const deletePart = (id: string, draft?: Blueprint) => {
  deleteParts([id], draft);
};
