import useBlueprint from 'stores/blueprint';
import translate from './translate';

export default function translateSelected(x: number, y: number) {
  translate(useBlueprint.getState().selections, x, y);
}
