import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'stores/blueprint';
import copyParts from './copyParts';

export default function copyPartsBySelection(blueprint?: Blueprint) {
  if (blueprint) {
    copyParts(blueprint.selections, blueprint);
  } else {
    copyPartsBySelection(useBlueprint.getState());
  }
}
