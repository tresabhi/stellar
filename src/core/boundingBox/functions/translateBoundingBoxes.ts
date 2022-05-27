import { Blueprint } from 'game/Blueprint';
import { Vector2 } from 'three';

export const translateBoundingBoxes = (
  ids: string[],
  vector: Vector2,
  state: Blueprint,
) => {
  ids.forEach((id) => {
    const boundingBox = state.boundingBoxes.get(id);

    if (boundingBox) {
      boundingBox.min.x += vector.x;
      boundingBox.min.y += vector.y;
      boundingBox.max.x += vector.x;
      boundingBox.max.y += vector.y;
    }
  });
};
