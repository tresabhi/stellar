import { getPart, getPartRegistry } from 'core/part';
import produce from 'immer';
import boundingBoxesCacheStore, {
  BoundingBox,
  BoundingBoxesCacheStore,
} from 'stores/boundingBoxesCache';
import { UUID } from 'types/Parts';

export const registerBoundingBox = (ID: UUID, boundingBox?: BoundingBox) => {
  const part = getPart(ID);

  if (part) {
    const computeBoundingBox = getPartRegistry(part.n)?.computeBoundingBox;

    if (boundingBox || computeBoundingBox) {
      const finalBoundingBox = boundingBox || computeBoundingBox!(part);

      boundingBoxesCacheStore.setState(
        produce((draft: BoundingBoxesCacheStore) => {
          draft.set(ID, finalBoundingBox);
        }),
      );
    }
  }
};
