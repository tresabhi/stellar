import produce from 'immer';
import useSettings, { UseSettings } from 'stores/settings';

export const mutateSettings = (recipe: (draft: UseSettings) => void) => {
  useSettings.setState(produce(recipe));
};
