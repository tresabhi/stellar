import { PrimitiveBox2 } from 'hooks/useBoundingBoxes';

export const union = (box1: PrimitiveBox2, box2: PrimitiveBox2) => ({
  min: {
    x: Math.min(box1.min.x, box2.min.x),
    y: Math.min(box1.min.y, box2.min.y),
  },
  max: {
    x: Math.max(box1.max.x, box2.max.x),
    y: Math.max(box1.max.y, box2.max.y),
  },
});
