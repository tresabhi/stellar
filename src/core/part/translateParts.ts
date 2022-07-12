import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { mutateParts } from './mutateParts';

export const translateParts = (
  ids: string[],
  x: number,
  y: number,
  draft?: Blueprint,
) => {
  if (draft) {
    mutateParts<PartWithTransformations>(
      ids,
      (draft) => {
        draft.p.x += x;
        draft.p.y += y;
      },
      draft,
    );
  } else {
    mutateBlueprint((draft) => {
      translateParts(ids, x, y, draft);
    });
  }
};
