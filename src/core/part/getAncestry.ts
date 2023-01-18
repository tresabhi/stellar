import { reverse } from 'lodash';
import useBlueprint from 'stores/blueprint';
import { ParentId } from 'types/Parts';

export default function getAncestry(
  id: string,
  full = false,
  blueprint = useBlueprint.getState(),
) {
  const ancestry: string[] = [];
  let lastParentId: ParentId = id;

  while (lastParentId !== null) {
    lastParentId = blueprint.parts[lastParentId].parent_id;
    if (lastParentId !== null) ancestry.push(lastParentId);
  }
  return full ? [...reverse(ancestry), id] : reverse(ancestry);
}
