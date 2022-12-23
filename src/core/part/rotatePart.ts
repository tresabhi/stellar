import { Blueprint } from 'game/Blueprint';
import rotateParts from './rotateParts';

export default function rotatePart(
  z: number,
  id: string,
  blueprint?: Blueprint,
) {
  rotateParts(z, [id], blueprint);
}
