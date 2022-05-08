import {
  Blueprint,
  BlueprintData,
  SavedBlueprint,
  VanillaBlueprint,
} from 'game/Blueprint';
import blueprintStore from 'stores/blueprint';
import { clearBlueprintHistory } from './clearBlueprintHistory';
import { importifyBlueprint } from './importifyBlueprint';

export const loadBlueprint = (
  importData?: VanillaBlueprint | SavedBlueprint | Blueprint,
) => {
  blueprintStore.setState(importifyBlueprint(importData ?? BlueprintData));
  clearBlueprintHistory();
};
