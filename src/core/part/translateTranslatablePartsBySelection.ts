import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { translateTranslatableParts } from './translateTranslatableParts';

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
