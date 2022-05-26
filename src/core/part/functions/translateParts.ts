import { mutateBlueprint } from 'core/blueprint';
import {
  declareBoundingBoxUpdates,
  translateBoundingBoxes
} from 'core/boundingBox';
import { Blueprint } from 'game/Blueprint';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { Vector2 } from 'three';
import { UUID } from 'types/Parts';
import { mutateParts } from './mutateParts';

export const translateParts = (
  IDs: UUID[],
  vector: Vector2,
  state?: Blueprint,
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
    translateBoundingBoxes(IDs, vector, state);
    declareBoundingBoxUpdates();
  } else {
    mutateBlueprint((draft) => {
      translateParts(IDs, vector, draft);
    });
  }
};
