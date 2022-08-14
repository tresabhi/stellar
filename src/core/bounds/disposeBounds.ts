import produce from 'immer';
import useBounds, { UseBounds } from 'stores/useBounds';
import { deferUpdates } from './deferUpdates';

export const disposeBounds = (ids: string[]) => {
  useBounds.setState(
    produce<UseBounds>((draft) => {
      ids.forEach((id) => draft.parts.delete(id));
    }),
  );
  deferUpdates();
};
