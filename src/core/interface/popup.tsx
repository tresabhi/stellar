import { mutatePopups } from 'core/app/mutatePopups';
import { nanoid } from 'nanoid';
import { FC } from 'react';
import { ToastProps } from 'stores/toasts';

export const popup = (Component: FC<ToastProps>) => {
  const id = nanoid();

  mutatePopups((draft) => {
    draft.popups.push({ id, node: <Component id={id} key={`popup-${id}`} /> });
  });
};
