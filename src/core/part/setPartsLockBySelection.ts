import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import setPartsLock from './setPartsLock';

export default function setPartsLockBySelection(
  locked: boolean,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    setPartsLock(blueprint.selections, locked, blueprint);
  } else {
    mutateBlueprint((draft) => setPartsLockBySelection(locked, draft));
  }
}
