import { Blueprint } from 'game/Blueprint';
import { selectPartsOnly } from './selectPartsOnly';

export const selectPartOnly = (id: string, draft?: Blueprint) => {
  selectPartsOnly([id], draft);
};
