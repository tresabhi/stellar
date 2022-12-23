import useBlueprint from 'stores/blueprint';
import translateParts from './translateParts';

export default function translatePartsBySelection(x: number, y: number) {
  translateParts(useBlueprint.getState().selections, x, y);
}
