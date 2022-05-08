import blueprintStore from 'stores/blueprint';
import { translateParts } from './translateParts';

export const translatePartsBySelection = (x: number, y: number) => {
  translateParts(blueprintStore.getState().selections, x, y);
};
