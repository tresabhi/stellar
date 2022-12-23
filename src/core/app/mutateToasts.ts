import produce from 'immer';
import useNotifications, { UseNotifications } from 'stores/notifications';

export const mutateToasts = (recipe: (draft: UseNotifications) => void) => {
  useNotifications.setState(produce(recipe));
};
