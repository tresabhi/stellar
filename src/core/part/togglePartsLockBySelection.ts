import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import togglePartsLock from './togglePartsLock';

export default function togglePartsLockBySelection(blueprint?: Blueprint) {
  if (blueprint) {
    togglePartsLock(blueprint.selections, blueprint);
  } else {
    mutateBlueprint((draft) => togglePartsLockBySelection(draft));
  }
}
