import { Blueprint } from 'game/Blueprint';
import { getPart } from './getPart';
import { selectPartsOnly } from './selectPartsOnly';

export const selectPartOnly = (id: string, draft?: Blueprint) => {
  if (!getPart(id).selected) selectPartsOnly([id], draft);
};
