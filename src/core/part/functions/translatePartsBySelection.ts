import useBlueprint from 'hooks/useBlueprint';
import { translateParts } from './translateParts';

export const translatePartsBySelection = (x: number, y: number) => {
  translateParts(useBlueprint.getState().selections, x, y);
};
