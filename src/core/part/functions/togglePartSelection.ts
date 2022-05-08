import { Blueprint } from 'game/Blueprint';
import { UUID } from 'types/Parts';
import { togglePartsSelection } from './togglePartsSelection';

export const togglePartSelection = (ID: UUID, state?: Blueprint) =>
  togglePartsSelection([ID], state);
