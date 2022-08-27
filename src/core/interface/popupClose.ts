import { mutateApp } from 'core/app/mutateApp';
import { Popup } from 'stores/useApp';

export const popupClose = () => {
  mutateApp((draft) => {
    draft.interface.popup = Popup.None;
  });
};
