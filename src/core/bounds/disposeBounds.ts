import useBounds, { UseBounds } from 'hooks/useBounds';
import produce from 'immer';
import { deferUpdates } from './deferUpdates';

export const disposeBounds = (ids: string[]) => {
  useBounds.setState(
    produce<UseBounds>((draft) => {
      ids.forEach((id) => draft.parts.delete(id));
    }),
  );
  deferUpdates();
};
