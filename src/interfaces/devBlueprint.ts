import saturnV from 'assets/blueprints/saturn-v.json';
import shapeAndTextures1 from 'assets/blueprints/shape-and-textures-1.json';
import testFuelTank from 'assets/blueprints/test-fuel-tank.json';
import { VanillaBlueprint } from 'game/Blueprint';
import produce from 'immer';
import { loadBlueprint } from 'interfaces/blueprint';
import settingsStore, { SettingsStore } from 'stores/settings';

export const devBlueprints: { [key: string]: VanillaBlueprint } = {
  testFuelTank,
  saturnV,
  shapeAndTextures1,
};

export const loadDevBlueprint = (name?: string) => {
  const blueprint = name ? devBlueprints[name] : undefined;

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
