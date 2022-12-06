import { mutatePopups } from 'core/app/mutatePopups';
import { nanoid } from 'nanoid';
import { FC } from 'react';
import { ToastProps } from 'stores/toasts';

export const popup = (Component: FC<ToastProps>, id = nanoid()) => {
  mutatePopups((draft) => {
    if (draft.popups.findIndex((popup) => popup.id === id) === -1) {
      draft.popups.push({
        id,
        node: <Component id={id} key={`popup-${id}`} />,
      });
    }
  });
};
