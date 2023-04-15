import useBlueprint from 'stores/blueprint';
import panTo from './panTo';

export default function panToSelected() {
  panTo(useBlueprint.getState().part_selections);
}
