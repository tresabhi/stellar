import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import scaleParts from './scale';

export default function scaleSelected(
  x: number,
  y: number,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    scaleParts(blueprint.selections, x, y);
  } else {
    mutateBlueprint((draft) => {
      scaleSelected(x, y, draft);
    });
  }
}
