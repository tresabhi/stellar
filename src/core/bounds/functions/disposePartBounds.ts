import useBounds, { UseBounds } from 'hooks/useBounds';
import produce from 'immer';

export const disposePartBounds = (ids: string[]) => {
  useBounds.setState(
    produce<UseBounds>((draft) => {
      ids.forEach((id) => draft.parts.delete(id));
    }),
  );
};
