import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import mutateParts from './mutateParts';

export default function togglePartsLock(ids: string[], blueprint?: Blueprint) {
  if (blueprint) {
    const firstLock = blueprint.parts[ids[0]].locked ?? true;
    const isMixed = ids.some((id) => blueprint.parts[id].locked !== firstLock);

    mutateParts(
      ids,
      (draft) => {
        draft.locked = isMixed ? false : !firstLock;
      },
      false,
      blueprint,
    );
  } else {
    mutateBlueprint((draft) => togglePartsLock(ids, draft));
  }
}
