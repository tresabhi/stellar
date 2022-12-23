import { Blueprint } from 'game/Blueprint';
import { cloneDeep } from 'lodash';

export default function savifyBlueprint(blueprint: Blueprint) {
  return cloneDeep(blueprint);
}
