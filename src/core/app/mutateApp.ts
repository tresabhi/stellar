import produce from 'immer';
import useApp, { UseApp } from 'stores/useApp';

export const mutateApp = (recipe: (draft: UseApp) => void) => {
  useApp.setState(produce(recipe));
};
