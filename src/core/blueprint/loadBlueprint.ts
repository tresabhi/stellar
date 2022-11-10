import {
  Blueprint,
  BlueprintData,
  SavedBlueprint,
  VanillaBlueprint,
} from 'game/Blueprint';
import useBlueprint from 'stores/blueprint';
import { clearVersionControl } from './clearVersionControl';
import { importifyBlueprint } from './importifyBlueprint';

export const loadBlueprint = (
  importData?: VanillaBlueprint | SavedBlueprint | Blueprint,
) => {
  useBlueprint.setState(importifyBlueprint(importData ?? BlueprintData));
  clearVersionControl();
};
