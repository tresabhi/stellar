import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import translateTranslatableParts from './translateTranslatableParts';

// TODO: find a better name
export default function translateTranslatablePartsBySelection(
  x: number,
  y: number,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    translateTranslatableParts(x, y, blueprint.selections, blueprint);
  } else {
    mutateBlueprint((draft) => {
      translateTranslatablePartsBySelection(x, y, draft);
    });
  }
}
