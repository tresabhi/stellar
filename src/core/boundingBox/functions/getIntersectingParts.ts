import boundingBoxesCacheStore from 'stores/boundingBoxesCache';
import { Vector2 } from 'three';
import { UUID } from 'types/Parts';

export const getIntersectingParts = (point: Vector2) => {
  const intersections: UUID[] = [];

  boundingBoxesCacheStore.getState().forEach((boundingBox, ID) => {
    if (
      boundingBox.min.x <= point.x &&
      boundingBox.max.x >= point.x &&
      boundingBox.min.y <= point.y &&
      boundingBox.max.y >= point.y
    ) {
      intersections.push(ID);
    }
  });

  return intersections;
};
