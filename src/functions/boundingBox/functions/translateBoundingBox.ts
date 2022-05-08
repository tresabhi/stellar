import { Vector2 } from 'three';
import { UUID } from 'types/Parts';
import { translateBoundingBoxes } from './translateBoundingBoxes';

export const translateBoundingBox = (ID: UUID, vector: Vector2) =>
  translateBoundingBoxes([ID], vector);
