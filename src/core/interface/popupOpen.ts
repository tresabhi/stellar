import { mutateApp } from 'core/app/mutateApp';
import { Popup } from 'stores/app';

export const popupOpen = (popup: Popup) => {
  mutateApp((draft) => {
    draft.interface.popup = popup;
  });
};
