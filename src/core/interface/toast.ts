import { mutateToasts } from 'core/app/mutateToasts';
import { nanoid } from 'nanoid';
import { Toast } from 'stores/toasts';

export const toast = (Component: Toast) => {
  mutateToasts((draft) => {
    draft.toasts.push({
      id: nanoid(),
      Component,
    });
  });
};
