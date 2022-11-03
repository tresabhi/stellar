import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { scaleParts } from './scaleParts';

export const scalePartsBySelection = (
  x: number,
  y: number,
  draft?: Blueprint,
) => {
  if (draft) {
    scaleParts(x, y, draft.selections);
  } else {
    mutateBlueprint((draft) => {
      scalePartsBySelection(x, y, draft);
    });
  }
};
