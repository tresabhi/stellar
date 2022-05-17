import { mutateBlueprint } from 'core/blueprint';
import { translateBoundingBoxes } from 'core/boundingBox';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import useBlueprint from 'hooks/useBlueprint';
import { Vector2 } from 'three';
import { UUID } from 'types/Parts';
import { mutateParts } from './mutateParts';

export const translateParts = (
  IDs: UUID[],
  x: number,
  y: number,
  state = useBlueprint.getState(),
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
  } else {
    mutateBlueprint((draft) => {
      translateParts(IDs, x, y, draft);
    });
    translateBoundingBoxes(IDs, new Vector2(x, y));
  }
};
