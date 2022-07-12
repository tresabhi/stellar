import { Blueprint } from 'game/Blueprint';
import { copyPartsToClipboard } from './copyPartsToClipboard';

export const copyPartToClipboard = (id: string, draft?: Blueprint) => {
  copyPartsToClipboard([id], draft);
};
