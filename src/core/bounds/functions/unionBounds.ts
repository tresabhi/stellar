import { PrimitiveBound } from 'hooks/useBounds';

export const unionBounds = (box1: PrimitiveBound, box2: PrimitiveBound) => ({
  min: {
    x: Math.min(box1.min.x, box2.min.x),
    y: Math.min(box1.min.y, box2.min.y),
  },
  max: {
    x: Math.max(box1.max.x, box2.max.x),
    y: Math.max(box1.max.y, box2.max.y),
  },
});
