import { Blueprint } from 'game/Blueprint';
import { Vector2 } from 'three';
import { UUID } from 'types/Parts';

export const translateBoundingBoxes = (
  IDs: UUID[],
  vector: Vector2,
  state: Blueprint,
) => {
  IDs.forEach((ID) => {
    const boundingBox = state.boundingBoxes[ID];

    if (boundingBox) {
      boundingBox.min.x += vector.x;
      boundingBox.min.y += vector.y;
      boundingBox.max.x += vector.x;
      boundingBox.max.y += vector.y;
    }
  });
};
