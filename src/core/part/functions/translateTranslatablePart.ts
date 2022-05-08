import { UUID } from 'types/Parts';
import { translateTranslatableParts } from './translateTranslatableParts';

export const translateTranslatablePart = (x: number, y: number, ID: UUID) => {
  translateTranslatableParts(x, y, [ID]);
};
