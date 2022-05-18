import { Blueprint } from 'game/Blueprint';
import { UUID } from 'types/Parts';
import { unselectParts } from './unselectParts';

export const unselectPart = (ID: UUID, state?: Blueprint) => {
  unselectParts([ID], state);
};
