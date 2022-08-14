import useBlueprint from 'stores/useBlueprint';
import { translateTranslatableParts } from './translateTranslatableParts';

export const translateTranslatablePartsBySelection = (x: number, y: number) => {
  translateTranslatableParts(x, y, useBlueprint.getState().selections);
};
