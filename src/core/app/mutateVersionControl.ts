import produce from 'immer';
import useVersionControl, { UseVersionControl } from 'stores/versionControl';

export default function mutateVersionControl(
  recipe: (draft: UseVersionControl) => void,
) {
  useVersionControl.setState(produce(recipe));
}
