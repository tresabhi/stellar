import produce from 'immer';
import useNotifications, { UseNotifications } from 'stores/notifications';

export default function mutateToasts(
  recipe: (draft: UseNotifications) => void,
) {
  useNotifications.setState(produce(recipe));
}
