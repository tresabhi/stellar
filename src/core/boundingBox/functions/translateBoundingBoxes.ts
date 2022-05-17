import useBoundingBoxes, {
  UseBoundingBoxesCache,
} from 'hooks/useBoundingBoxes';
import produce from 'immer';
import { Vector2 } from 'three';
import { UUID } from 'types/Parts';

export const translateBoundingBoxes = (IDs: UUID[], vector: Vector2) => {
  useBoundingBoxes.setState(
    produce((draft: UseBoundingBoxesCache) => {
      IDs.forEach((ID) => {
        const boundingBox = draft[ID];
        if (boundingBox) boundingBox.translate(vector);
      });
    }),
  );
};
