import { Blueprint } from 'game/Blueprint';
import { UUID } from 'types/Parts';
import { deleteParts } from './deleteParts';

export const deletePart = (ID: UUID, state?: Blueprint) =>
  deleteParts([ID], state);
