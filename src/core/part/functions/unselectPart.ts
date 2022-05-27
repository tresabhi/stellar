import { Blueprint } from 'game/Blueprint';
import { unselectParts } from './unselectParts';

export const unselectPart = (id: string, state?: Blueprint) => {
  unselectParts([id], state);
};
