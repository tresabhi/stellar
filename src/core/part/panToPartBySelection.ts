import useBlueprint from 'stores/blueprint';
import { panToPart } from './panToPart';

export default function panToPartBySelection() {
  const lastSelection = useBlueprint.getState().selections[0];
  if (lastSelection) panToPart(lastSelection);
}
