import { Blueprint } from 'game/Blueprint';
import { togglePartsSelection } from './togglePartsSelection';

export const togglePartSelection = (id: string, state?: Blueprint) =>
  togglePartsSelection([id], state);
