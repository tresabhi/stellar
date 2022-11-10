import produce from 'immer';
import useVersionControl, { UseVersionControl } from 'stores/versionControl';

export const mutateVersionControl = (
  recipe: (draft: UseVersionControl) => void,
) => {
  useVersionControl.setState(produce(recipe));
};
