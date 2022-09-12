import { Blueprint } from 'game/Blueprint';
import { selectParts } from './selectParts';

export const selectPart = (id: string, draft?: Blueprint) => {
  selectParts([id], draft);
};
