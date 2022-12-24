import produce from 'immer';
import useNotifications, { UseNotifications } from 'stores/notifications';

export default function mutateNotifications(
  recipe: (draft: UseNotifications) => void,
) {
  useNotifications.setState(produce(recipe));
}
