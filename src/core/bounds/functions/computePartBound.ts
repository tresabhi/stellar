import { PrimitiveBound } from 'hooks/useBounds';
import { MutableRefObject } from 'react';
import { Box3, Group } from 'three';
import { setPartBound } from './setPartBound';

export const computePartBound = (
  id: string,
  group: MutableRefObject<Group>,
) => {
  const box3 = new Box3().setFromObject(group.current);
  const primitiveBound: PrimitiveBound = {
    min: { x: box3.min.x, y: box3.min.y },
    max: { x: box3.max.x, y: box3.max.y },
  };

  setPartBound(id, primitiveBound);

  return primitiveBound;
};
