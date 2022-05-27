import { Blueprint } from 'game/Blueprint';
import { Vector2 } from 'three';
import { translateBoundingBoxes } from './translateBoundingBoxes';

export const translateBoundingBox = (
  id: string,
  vector: Vector2,
  state: Blueprint,
) => translateBoundingBoxes([id], vector, state);
