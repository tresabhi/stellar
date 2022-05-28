import { translateBoundingBoxes } from './translateBoundingBoxes';

/**
 * This function does not accept ThreeJS Vector2 for performance reasons
 */
export const translateBoundingBox = (id: string, x: number, y: number) =>
  translateBoundingBoxes([id], x, y);
