import { Blueprint } from 'game/Blueprint';
import { disposeBoundingBoxes } from './disposeBoundingBoxes';

export const disposeBoundingBox = (id: string, state: Blueprint) => {
  disposeBoundingBoxes([id], state);
};
