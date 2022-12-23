import produce from 'immer';
import usePartRegistry, { UsePartRegistry } from 'stores/partRegistry';

export default function mutatePartRegistry(
  recipe: (draft: UsePartRegistry) => void,
) {
  usePartRegistry.setState(produce(recipe));
}
