import { mutateBlueprint } from 'core/blueprint';
import { translateBoundingBoxes } from 'core/boundingBox';
import { Blueprint } from 'game/Blueprint';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { Vector2 } from 'three';
import { UUID } from 'types/Parts';
import { mutateParts } from './mutateParts';

export const translateParts = (
  IDs: UUID[],
  vector: Vector2,
  state?: Blueprint,
  updateBoundingBoxes = true,
) => {
  if (state) {
    mutateParts<PartWithTransformations>(
      IDs,
      (draft) => {
        draft.p.x += vector.x;
        draft.p.y += vector.y;
      },
      state,
    );
    if (updateBoundingBoxes) translateBoundingBoxes(IDs, vector);
  } else {
    mutateBlueprint((draft) => {
      translateParts(IDs, vector, draft);
    });
  }
};
