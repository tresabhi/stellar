import blueprintStore from 'hooks/useBlueprint';
import { translateParts } from './translateParts';

export const translatePartsBySelection = (x: number, y: number) => {
  translateParts(blueprintStore.getState().selections, x, y);
};
