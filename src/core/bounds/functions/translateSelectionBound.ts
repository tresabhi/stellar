import useBounds, { UseBounds } from 'hooks/useBounds';
import produce from 'immer';

export const translateSelectionBound = (x: number, y: number) => {
  useBounds.setState(
    produce<UseBounds>((draft) => {
      if (draft.selection) {
        draft.selection.min.x += x;
        draft.selection.min.y += y;
        draft.selection.max.x += x;
        draft.selection.max.y += y;
      } else {
      }
    }),
  );
};
