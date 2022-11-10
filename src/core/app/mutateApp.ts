import produce from 'immer';
import useApp, { UseApp } from 'stores/app';

export const mutateApp = (recipe: (draft: UseApp) => void) => {
  useApp.setState(produce(recipe));
};
