import produce from 'immer';
import boundingBoxesCacheStore, {
  BoundingBoxesCacheStore,
} from 'stores/boundingBoxesCache';
import { UUID } from 'types/Parts';

export const disposeBoundingBoxes = (IDs: UUID[]) => {
  boundingBoxesCacheStore.setState(
    produce((draft: BoundingBoxesCacheStore) => {
      IDs.forEach((ID) => {
        draft.delete(ID);
      });
    }),
  );
};
