import useBoundingBoxes, {
  PrimitiveBox2,
  UseBoundingBoxes,
} from 'hooks/useBoundingBoxes';
import produce from 'immer';
import { UUID } from 'types/Parts';

export const updateBoundingBox = (ID: UUID, boundingBox: PrimitiveBox2) => {
  useBoundingBoxes.setState(
    produce((draft: UseBoundingBoxes) => {
      draft[ID] = boundingBox;
    }),
  );
};
