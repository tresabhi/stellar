import { translateBounds } from './translateBounds';

/**
 * This function does not accept ThreeJS Vector2 for performance reasons
 */
export const translateBound = (id: string, x: number, y: number) =>
  translateBounds([id], x, y);
