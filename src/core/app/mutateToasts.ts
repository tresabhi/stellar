import produce from 'immer';
import useToasts, { UseToasts } from 'stores/useToasts';

export const mutateToasts = (recipe: (draft: UseToasts) => void) => {
  useToasts.setState(produce(recipe));
};
