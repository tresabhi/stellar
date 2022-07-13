import { Blueprint } from 'game/Blueprint';
import { ungroupGroups } from './ungroupGroups';

export const ungroupGroup = (id: string, draft?: Blueprint) => {
  ungroupGroups([id], draft);
};
