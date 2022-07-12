import { Blueprint } from 'game/Blueprint';
import { copyParts } from './copyParts';

export const copyPart = (id: string, draft?: Blueprint) => {
  copyParts([id], draft);
};
