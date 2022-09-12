import produce from 'immer';
import useBounds, { UseBounds } from 'stores/useBounds';

export const mutateBounds = (recipe: (draft: UseBounds) => void) => {
  useBounds.setState(produce(recipe));
};
