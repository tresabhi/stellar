import useBoundingBoxes, { UseBoundingBoxes } from 'hooks/useBoundingBoxes';
import produce from 'immer';
import { UUID } from 'types/Parts';

export const disposeBoundingBoxes = (IDs: UUID[]) => {
  useBoundingBoxes.setState(
    produce((draft: UseBoundingBoxes) => {
      IDs.forEach((ID) => {
        delete draft[ID];
      });
    }),
  );
};
