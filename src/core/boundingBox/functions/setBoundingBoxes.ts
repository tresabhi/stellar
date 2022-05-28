import useBoundingBoxes, {
  PrimitiveBox2,
  UseBoundingBoxes,
} from 'hooks/useBoundingBoxes';
import produce from 'immer';

export const setBoundingBoxes = (ids: string[], boundingBox: PrimitiveBox2) => {
  useBoundingBoxes.setState(
    produce<UseBoundingBoxes>((draft) => {
      ids.forEach((id) => {
        draft.partBounds.set(id, boundingBox);
      });
    }),
  );
};
