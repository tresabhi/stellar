import useBoundingBoxes, {
  UseBoundingBoxesCache,
} from 'hooks/useBoundingBoxes';
import produce from 'immer';
import { UUID } from 'types/Parts';

export const disposeBoundingBoxes = (IDs: UUID[]) => {
  useBoundingBoxes.setState(
    produce((draft: UseBoundingBoxesCache) => {
      IDs.forEach((ID) => {
        delete draft[ID];
      });
    }),
  );
};
