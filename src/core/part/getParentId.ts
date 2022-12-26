import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'stores/blueprint';

export default function getParentId(
  id: string,
  blueprint: Blueprint = useBlueprint.getState(),
) {
  return blueprint.parts[id].parent_id;
}
