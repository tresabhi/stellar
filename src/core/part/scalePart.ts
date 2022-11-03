import { Blueprint } from 'game/Blueprint';
import { scaleParts } from './scaleParts';

export const scalePart = (
  x: number,
  y: number,
  id: string,
  draft?: Blueprint,
) => scaleParts(x, y, [id], draft);
