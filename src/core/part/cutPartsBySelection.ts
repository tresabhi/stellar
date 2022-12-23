import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import cutParts from './cutParts';

export default function cutPartsBySelection(blueprint?: Blueprint) {
  if (blueprint) {
    cutParts([...blueprint.selections], blueprint);
  } else {
    mutateBlueprint((draft) => cutPartsBySelection(draft));
  }
}
