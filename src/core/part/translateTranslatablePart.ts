import { translateTranslatableParts } from './translateTranslatableParts';

export const translateTranslatablePart = (x: number, y: number, id: string) => {
  translateTranslatableParts(x, y, [id]);
};
