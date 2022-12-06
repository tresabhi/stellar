import { mutateToasts } from 'core/app/mutateToasts';
import { nanoid } from 'nanoid';
import { FC } from 'react';
import { ToastProps } from 'stores/toasts';

export const toast = (Component: FC<ToastProps>) => {
  const id = nanoid();

  mutateToasts((draft) => {
    draft.toasts.push({ id, node: <Component id={id} key={`toast-${id}`} /> });
  });
};
