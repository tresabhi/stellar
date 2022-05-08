import { Blueprint } from 'game/Blueprint';
import { UUID } from 'types/Parts';
import { selectPartsOnly } from './selectPartsOnly';

export const selectPartOnly = (ID: UUID, state?: Blueprint) =>
  selectPartsOnly([ID], state);
