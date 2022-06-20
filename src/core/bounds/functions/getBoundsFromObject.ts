import { PrimitiveBounds } from 'hooks/useBounds';
import { MutableRefObject } from 'react';
import { Box3, Group, Mesh } from 'three';

export const getBoundsFromObject = (object: MutableRefObject<Group | Mesh>) => {
  const box3 = new Box3().setFromObject(object.current);
  const box2: PrimitiveBounds = {
    min: { x: box3.min.x, y: box3.min.y },
    max: { x: box3.max.x, y: box3.max.y },
  };

  return box2;
};
