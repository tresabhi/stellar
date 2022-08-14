import onePart from 'assets/blueprints/one-part.json';
import shapeAndTextures1 from 'assets/blueprints/shape-and-textures-1.json';
import testFuelTank from 'assets/blueprints/test-fuel-tank.json';
import { loadBlueprint } from 'core/blueprint';
import { VanillaBlueprint } from 'game/Blueprint';
import useSettings, { UseSettings } from 'stores/useSettings';
import produce from 'immer';

export const templateBlueprints: { [key: string]: VanillaBlueprint } = {
  testFuelTank,
  shapeAndTextures1,
  onePart,
};

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
