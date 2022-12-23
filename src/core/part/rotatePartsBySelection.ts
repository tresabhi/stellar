import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import rotateParts from './rotateParts';

export default function rotatePartsBySelection(
  z: number,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    rotateParts(z, blueprint.selections, blueprint);
  } else {
    mutateBlueprint((draft) => {
      rotateParts(z, draft.selections, draft);
    });
  }
}
