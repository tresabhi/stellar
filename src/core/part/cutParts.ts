import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import copyParts from './copyParts';
import deleteParts from './deleteParts';

export default function cutParts(ids: string[], blueprint?: Blueprint) {
  if (blueprint) {
    copyParts(ids, blueprint);
    deleteParts(ids, blueprint);
  } else {
    mutateBlueprint((draft) => cutParts(ids, draft));
  }
}
