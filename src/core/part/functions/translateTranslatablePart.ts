import { Vector2 } from 'three';
import { translateTranslatableParts } from './translateTranslatableParts';

export const translateTranslatablePart = (vector: Vector2, id: string) => {
  translateTranslatableParts(vector, [id]);
};
