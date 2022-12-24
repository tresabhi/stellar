import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { MethodIds } from 'types/Parts';
import mutateParts from './mutateParts';

export default function toggleLocked(ids: MethodIds, blueprint?: Blueprint) {
  if (blueprint) {
    if (typeof ids === 'string') {
      blueprint.parts[ids].locked = !blueprint.parts[ids].locked;
    } else {
      const firstLock = blueprint.parts[ids[0]].locked ?? true;
      const isMixed = ids.some(
        (id) => blueprint.parts[id].locked !== firstLock,
      );

      mutateParts(
        ids,
        (draft) => {
          draft.locked = isMixed ? false : !firstLock;
        },
        false,
        blueprint,
      );
    }
  } else {
    mutateBlueprint((draft) => toggleLocked(ids, draft));
  }
}
