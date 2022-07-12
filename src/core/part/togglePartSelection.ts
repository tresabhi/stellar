import { Blueprint } from 'game/Blueprint';
import { togglePartsSelection } from './togglePartsSelection';

export const togglePartSelection = (id: string, draft?: Blueprint) => {
  togglePartsSelection([id], draft);
};
