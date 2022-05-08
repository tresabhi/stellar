import { loadBlueprint } from 'core/blueprint';
import produce from 'immer';
import settingsStore, { SettingsStore } from 'stores/settings';
import { templateBlueprints } from '../constants/templateBlueprint';

export const loadBlueprintTemplate = (name?: string) => {
  const blueprint = name ? templateBlueprints[name] : undefined;

  if (blueprint) {
    loadBlueprint(blueprint);

    settingsStore.setState(
      produce((draft: SettingsStore) => {
        draft.debug.dev_blueprint = name;
      }),
    );
  } else {
    settingsStore.setState(
      produce((draft: SettingsStore) => {
        delete draft.debug.dev_blueprint;
      }),
    );
  }
};
