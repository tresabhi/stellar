import produce from 'immer';
import useSnippets, { UseSnippets } from 'stores/snippets';

export default function mutateSnippets(recipe: (draft: UseSnippets) => void) {
  useSnippets.setState(produce(recipe));
}
