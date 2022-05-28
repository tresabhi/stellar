import useBlueprint from 'hooks/useBlueprint';
import useBoundingBoxes, { UseBoundingBoxes } from 'hooks/useBoundingBoxes';
import produce from 'immer';
import { translateBoundingBoxes } from './translateBoundingBoxes';

export const translateSelectionBoundingBox = (x: number, y: number) => {
  const { selections } = useBlueprint.getState();

  translateBoundingBoxes(selections, x, y);
  useBoundingBoxes.setState(
    produce<UseBoundingBoxes>((draft) => {
      if (draft.selectionBound) {
        draft.selectionBound.min.x += x;
        draft.selectionBound.min.y += y;
        draft.selectionBound.max.x += x;
        draft.selectionBound.max.y += y;
      } else {
      }
    }),
  );
};
