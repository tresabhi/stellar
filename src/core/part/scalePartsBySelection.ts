import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import scaleParts from './scaleParts';

export default function scalePartsBySelection(
  x: number,
  y: number,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    scaleParts(x, y, blueprint.selections);
  } else {
    mutateBlueprint((draft) => {
      scalePartsBySelection(x, y, draft);
    });
  }
}
