import { Blueprint } from 'game/Blueprint';
import { rotateParts } from './rotateParts';

export const rotatePart = (z: number, id: string, draft?: Blueprint) => {
  rotateParts(z, [id], draft);
};
