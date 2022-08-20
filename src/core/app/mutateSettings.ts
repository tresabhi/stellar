import produce from 'immer';
import useSettings, { UseSettings } from 'stores/useSettings';

export const mutateSettings = (recipe: (draft: UseSettings) => void) => {
  useSettings.setState(produce(recipe));
};
