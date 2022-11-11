import { Blueprint, blueprintData, VanillaBlueprint } from 'game/Blueprint';
import useBlueprint from 'stores/blueprint';
import { clearVersionControl } from './clearVersionControl';
import { importifyBlueprint } from './importifyBlueprint';

export const loadBlueprint = (importData?: VanillaBlueprint | Blueprint) => {
  useBlueprint.setState(importifyBlueprint(importData ?? blueprintData));
  clearVersionControl();
};
