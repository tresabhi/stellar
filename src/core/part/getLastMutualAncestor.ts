import useBlueprint from 'stores/blueprint';
import { ParentId } from 'types/Parts';
import lastIntersection from 'utilities/lastIntersection';
import getAncestry from './getAncestry';

export default function getLastMutualAncestor(
  id1: string,
  id2: string,
  blueprint = useBlueprint.getState(),
): ParentId {
  const last = lastIntersection(
    getAncestry(id1, true, blueprint),
    getAncestry(id2, true, blueprint),
  );

  return last === undefined || last.length === 0 ? null : last;
}
