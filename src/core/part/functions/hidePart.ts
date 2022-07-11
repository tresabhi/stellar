import { Blueprint } from 'game/Blueprint';
import { hideParts } from './hideParts';

export const hidePart = (id: string, draft?: Blueprint) => {
  hideParts([id], draft);
};
