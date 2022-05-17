import { mutateBlueprint } from 'core/blueprint';
import { translateBoundingBoxes } from 'core/boundingBox';
import { Blueprint } from 'game/Blueprint';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { Vector2 } from 'three';
import { UUID } from 'types/Parts';
import { mutateParts } from './mutateParts';

export const translateParts = (
  IDs: UUID[],
  x: number,
  y: number,
  state?: Blueprint,
  updateBoundingBoxes = true,
) => {
  if (state) {
    mutateParts<PartWithTransformations>(
      IDs,
      (draft) => {
        draft.p.x += x;
        draft.p.y += y;
      },
      state,
    );
    if (updateBoundingBoxes) translateBoundingBoxes(IDs, new Vector2(x, y));
  } else {
    mutateBlueprint((draft) => {
      translateParts(IDs, x, y, draft);
    });
  }
};
