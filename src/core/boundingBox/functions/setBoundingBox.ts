import { PrimitiveBox2 } from 'hooks/useBoundingBoxes';
import { setBoundingBoxes } from './setBoundingBoxes';

export const setBoundingBox = (id: string, boundingBox: PrimitiveBox2) => {
  setBoundingBoxes([id], boundingBox);
};
