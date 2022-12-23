import produce from 'immer';
import usePrompts, { UsePrompts } from 'stores/prompts';

export const mutatePopups = (recipe: (draft: UsePrompts) => void) => {
  usePrompts.setState(produce(recipe));
};
