import { Blueprint } from 'game/Blueprint';
import scaleParts from './scaleParts';

export default function scalePart(
  x: number,
  y: number,
  id: string,
  blueprint?: Blueprint,
) {
  return scaleParts(x, y, [id], blueprint);
}
