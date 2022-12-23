import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';

export default function setPartsLock(
  ids: string[],
  locked: boolean,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    ids.forEach((id) => {
      blueprint.parts[id].locked = locked;
    });
  } else {
    mutateBlueprint((draft) => setPartsLock(ids, locked, draft));
  }
}
