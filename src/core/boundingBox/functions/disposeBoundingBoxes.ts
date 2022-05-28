import useBoundingBoxes, { UseBoundingBoxes } from 'hooks/useBoundingBoxes';
import produce from 'immer';

export const disposeBoundingBoxes = (ids: string[]) => {
  useBoundingBoxes.setState(
    produce<UseBoundingBoxes>((draft) => {
      ids.forEach((id) => draft.partBounds.delete(id));
    }),
  );
};
