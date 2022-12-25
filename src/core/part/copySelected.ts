import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'stores/blueprint';
import copy from './copy';

export default function copySelected(blueprint?: Blueprint) {
  if (blueprint) {
    copy(blueprint.selections, blueprint);
  } else {
    copySelected(useBlueprint.getState());
  }
}
