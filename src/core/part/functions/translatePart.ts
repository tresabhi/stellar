import { UUID } from 'types/Parts';
import { translateParts } from './translateParts';

export const translatePart = (ID: UUID, x: number, y: number) => {
  translateParts([ID], x, y);
};
