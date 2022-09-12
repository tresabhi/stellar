import { mutateBounds } from 'core/app';
import { deferUpdates } from './deferUpdates';

export const disposeBounds = (ids: string[]) => {
  mutateBounds((draft) => {
    ids.forEach((id) => draft.parts.delete(id));
  });

  deferUpdates();
};
