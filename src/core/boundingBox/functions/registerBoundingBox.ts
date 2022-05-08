import { getPart, getPartRegistry } from 'core/part';
import useBoundingBoxes, {
  PrimitiveBoundingBox,
  UseBoundingBoxesCache,
} from 'hooks/useBoundingBoxes';
import produce from 'immer';
import { UUID } from 'types/Parts';

export const registerBoundingBox = (
  ID: UUID,
  boundingBox?: PrimitiveBoundingBox,
) => {
  const part = getPart(ID);

  if (part) {
    const computeBoundingBox = getPartRegistry(part.n)?.computeBoundingBox;

    if (boundingBox || computeBoundingBox) {
      const finalBoundingBox = boundingBox || computeBoundingBox!(part);

      useBoundingBoxes.setState(
        produce((draft: UseBoundingBoxesCache) => {
          draft.set(ID, finalBoundingBox);
        }),
      );
    }
  }
};
