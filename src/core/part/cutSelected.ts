import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import cut from './cut';

export default function cutPartsBySelection(blueprint?: Blueprint) {
  if (blueprint) {
    cut([...blueprint.selections], blueprint);
  } else {
    mutateBlueprint((draft) => cutPartsBySelection(draft));
  }
}
