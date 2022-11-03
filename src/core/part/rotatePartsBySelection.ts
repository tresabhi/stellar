import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { rotateParts } from './rotateParts';

export const rotatePartsBySelection = (z: number, draft?: Blueprint) => {
  if (draft) {
    rotateParts(z, draft.selections, draft);
  } else {
    mutateBlueprint((draft) => {
      rotateParts(z, draft.selections, draft);
    });
  }
};
