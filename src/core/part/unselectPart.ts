import { Blueprint } from 'game/Blueprint';
import { unselectParts } from './unselectParts';

export const unselectPart = (id: string, draft?: Blueprint) => {
  unselectParts([id], draft);
};
