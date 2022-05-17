import useBlueprint from 'hooks/useBlueprint';
import { Vector2 } from 'three';
import { translateTranslatableParts } from './translateTranslatableParts';

export const translateTranslatablePartsBySelection = (vector: Vector2) => {
  translateTranslatableParts(vector, useBlueprint.getState().selections);
};
