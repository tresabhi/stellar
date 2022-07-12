import { Blueprint } from 'game/Blueprint';
import { cutParts } from './cutParts';

export const cutPart = (id: string, draft?: Blueprint) => {
  cutParts([id], draft);
};
