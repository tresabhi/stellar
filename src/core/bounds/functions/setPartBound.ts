import { PrimitiveBound } from 'hooks/useBounds';
import { setPartBounds } from './setPartBounds';

export const setPartBound = (id: string, bound: PrimitiveBound) => {
  setPartBounds([id], bound);
};
