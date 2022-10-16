import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { translateTranslatableParts } from './translateTranslatableParts';

export const translateTranslatablePartsBySelection = (
  x: number,
  y: number,
  draft?: Blueprint,
) => {
  if (draft) {
    translateTranslatableParts(x, y, draft.selections, draft);
  } else {
    mutateBlueprint((draft) => {
      translateTranslatablePartsBySelection(x, y, draft);
    });
  }
};
