import blueprintStore from 'stores/blueprint';
import { translateTranslatableParts } from './translateTranslatableParts';

export const translateTranslatablePartsBySelection = (x: number, y: number) => {
  translateTranslatableParts(x, y, blueprintStore.getState().selections);
};
