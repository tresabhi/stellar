import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';

export default function setLocked(
  ids: MethodIds,
  locked: boolean,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    normalizeIds(ids).forEach((id) => {
      blueprint.parts[id].locked = locked;
    });
  } else {
    mutateBlueprint((draft) => setLocked(ids, locked, draft));
  }
}
