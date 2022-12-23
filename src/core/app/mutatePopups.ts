import produce from 'immer';
import usePrompts, { UsePrompts } from 'stores/prompts';

export default function mutatePopups(recipe: (draft: UsePrompts) => void) {
  usePrompts.setState(produce(recipe));
}
