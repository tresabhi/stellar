import useBoundingBoxes, {
  PrimitiveBoundingBox,
  UseBoundingBoxesCache,
} from 'hooks/useBoundingBoxes';
import produce from 'immer';
import { UUID } from 'types/Parts';

export const updateBoundingBox = (
  ID: UUID,
  boundingBox: PrimitiveBoundingBox,
) => {
  useBoundingBoxes.setState(
    produce((draft: UseBoundingBoxesCache) => {
      draft.set(ID, boundingBox);
    }),
  );
};
