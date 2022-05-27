import { Blueprint } from 'game/Blueprint';
import { selectPartsOnly } from './selectPartsOnly';

export const selectPartOnly = (id: string, state?: Blueprint) =>
  selectPartsOnly([id], state);
