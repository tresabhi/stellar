import { Blueprint } from 'game/Blueprint';
import { Vector2 } from 'three';
import { UUID } from 'types/Parts';
import { translateBoundingBoxes } from './translateBoundingBoxes';

export const translateBoundingBox = (
  ID: UUID,
  vector: Vector2,
  state: Blueprint,
) => translateBoundingBoxes([ID], vector, state);
