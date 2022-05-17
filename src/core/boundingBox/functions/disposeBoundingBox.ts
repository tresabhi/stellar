import { Blueprint } from 'game/Blueprint';
import { UUID } from 'types/Parts';
import { disposeBoundingBoxes } from './disposeBoundingBoxes';

export const disposeBoundingBox = (ID: UUID, state: Blueprint) => {
  disposeBoundingBoxes([ID], state);
};
