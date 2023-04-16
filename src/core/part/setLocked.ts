import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { MethodIds } from 'types/Parts';
import normalizeArray from 'utilities/normalizeArray';

export default function setLocked(
  ids: MethodIds,
  locked: boolean,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    normalizeArray(ids).forEach((id) => {
      blueprint.parts[id].locked = locked;
    });
  } else {
    mutateBlueprint((draft) => setLocked(ids, locked, draft));
  }
}
