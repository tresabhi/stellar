import useBoundingBoxes, { UseBoundingBoxes } from 'hooks/useBoundingBoxes';
import produce from 'immer';

/**
 * This function does not accept ThreeJS Vector2 for performance reasons
 */
export const translateBoundingBoxes = (ids: string[], x: number, y: number) => {
  useBoundingBoxes.setState(
    produce<UseBoundingBoxes>((draft) => {
      ids.forEach((id) => {
        const boundingBox = draft.partBounds.get(id);

        if (boundingBox) {
          boundingBox.min.x += x;
          boundingBox.min.y += y;
          boundingBox.max.x += x;
          boundingBox.max.y += y;
        }
      });
    }),
  );
};
