import produce from 'immer';
import useToasts, { UseToasts } from 'stores/toasts';

export const mutateToasts = (recipe: (draft: UseToasts) => void) => {
  useToasts.setState(produce(recipe));
};
