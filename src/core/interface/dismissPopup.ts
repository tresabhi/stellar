import { mutatePopups } from 'core/app/mutatePopups';

export const dismissPopup = (id: string) => {
  mutatePopups((draft) => {
    const index = draft.popups.findIndex((popup) => popup.id === id);
    if (index !== -1) draft.popups.splice(index, 1);
  });
};
