import { loadBlueprint } from 'core/blueprint';
import useSettings, { UseSettings } from 'hooks/useSettings';
import produce from 'immer';
import { templateBlueprints } from '../constants/templateBlueprint';

export const loadBlueprintTemplate = (name?: string) => {
  const blueprint = name ? templateBlueprints[name] : undefined;

  if (blueprint) {
    loadBlueprint(blueprint);

    useSettings.setState(
      produce((draft: UseSettings) => {
        draft.debug.dev_blueprint = name;
      }),
    );
  } else {
    useSettings.setState(
      produce((draft: UseSettings) => {
        delete draft.debug.dev_blueprint;
      }),
    );
  }
};
