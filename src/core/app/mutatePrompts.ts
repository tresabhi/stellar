import produce from 'immer';
import usePrompts, { UsePrompts } from 'stores/prompts';

export default function mutatePrompts(recipe: (draft: UsePrompts) => void) {
  usePrompts.setState(produce(recipe));
}
