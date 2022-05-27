import { Blueprint } from 'game/Blueprint';
import { deleteParts } from './deleteParts';

export const deletePart = (id: string, state?: Blueprint) =>
  deleteParts([id], state);
