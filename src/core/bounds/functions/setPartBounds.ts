import useBounds, {
  PrimitiveBound,
  UseBounds
} from 'hooks/useBounds';
import produce from 'immer';

export const setPartBounds = (ids: string[], bound: PrimitiveBound) => {
  useBounds.setState(
    produce<UseBounds>((draft) => {
      ids.forEach((id) => {
        draft.parts.set(id, bound);
      });
    }),
  );
};
