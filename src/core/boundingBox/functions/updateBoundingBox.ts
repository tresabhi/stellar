import ImmerableBox2 from 'classes/ImmerableBox2';
import useBoundingBoxes, {
  UseBoundingBoxesCache,
} from 'hooks/useBoundingBoxes';
import produce from 'immer';
import { UUID } from 'types/Parts';

export const updateBoundingBox = (ID: UUID, boundingBox: ImmerableBox2) => {
  useBoundingBoxes.setState(
    produce((draft: UseBoundingBoxesCache) => {
      draft[ID] = boundingBox;
    }),
  );
};
