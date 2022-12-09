import { mutatePopups } from 'core/app/mutatePopups';
import { nanoid } from 'nanoid';
import { FC } from 'react';
import useApp from 'stores/app';
import { ToastProps } from 'stores/toasts';

export const popup = (
  Component: FC<ToastProps>,
  dismissByBlur = true,
  id = nanoid(),
) => {
  if (useApp.getState().interface.newPopupsEnabled) {
    mutatePopups((draft) => {
      if (draft.popups.findIndex((popup) => popup.id === id) === -1) {
        draft.popups.push({
          id,
          dismissByBlur,
          node: <Component id={id} key={`popup-${id}`} />,
        });
      }
    });
  }
};
