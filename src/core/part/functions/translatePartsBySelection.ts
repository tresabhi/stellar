import useBlueprint from 'hooks/useBlueprint';
import { Vector2 } from 'three';
import { translateParts } from './translateParts';

export const translatePartsBySelection = (vector: Vector2) => {
  translateParts(useBlueprint.getState().selections, vector);
};
