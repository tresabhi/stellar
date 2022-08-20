import { mutateApp } from 'core/app/mutateApp';

export const popupClose = () => {
  mutateApp((draft) => delete draft.interface.popup);
};
