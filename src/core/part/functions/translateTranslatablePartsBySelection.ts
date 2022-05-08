import blueprintStore from 'hooks/useBlueprint';
import { translateTranslatableParts } from './translateTranslatableParts';

export const translateTranslatablePartsBySelection = (x: number, y: number) => {
  translateTranslatableParts(x, y, blueprintStore.getState().selections);
};
