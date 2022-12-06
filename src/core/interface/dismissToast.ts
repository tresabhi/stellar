import { mutateToasts } from 'core/app/mutateToasts';

export const dismissToast = (id: string) => {
  mutateToasts((draft) => {
    const index = draft.toasts.findIndex((toast) => toast.id === id);
    if (index !== -1) draft.toasts.splice(index, 1);
  });
};
