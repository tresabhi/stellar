import { Vector2 } from 'three';
import { UUID } from 'types/Parts';
import { translateTranslatableParts } from './translateTranslatableParts';

export const translateTranslatablePart = (vector: Vector2, ID: UUID) => {
  translateTranslatableParts(vector, [ID]);
};
