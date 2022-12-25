import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';
import copy from './copy';
import deleteParts from './deleteParts';

export default function cut(ids: MethodIds, blueprint?: Blueprint) {
  if (blueprint) {
    const normalizedIds = normalizeIds(ids);
    copy(normalizedIds, blueprint);
    deleteParts(normalizedIds, blueprint);
  } else {
    mutateBlueprint((draft) => cut(ids, draft));
  }
}
