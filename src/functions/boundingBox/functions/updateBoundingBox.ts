import produce from 'immer';
import boundingBoxesCacheStore, {
  BoundingBox,
  BoundingBoxesCacheStore,
} from 'stores/boundingBoxesCache';
import { UUID } from 'types/Parts';

export const updateBoundingBox = (ID: UUID, boundingBox: BoundingBox) => {
  boundingBoxesCacheStore.setState(
    produce((draft: BoundingBoxesCacheStore) => {
      draft.set(ID, boundingBox);
    }),
  );
};
