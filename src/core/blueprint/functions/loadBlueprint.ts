import {
  Blueprint,
  BlueprintData,
  SavedBlueprint,
  VanillaBlueprint,
} from 'game/Blueprint';
import blueprintStore from 'stores/blueprint';
import { clearVersionControl } from './clearVersionControl';
import { blueprintImportify } from './blueprintImportify';

export const loadBlueprint = (
  importData?: VanillaBlueprint | SavedBlueprint | Blueprint,
) => {
  blueprintStore.setState(blueprintImportify(importData ?? BlueprintData));
  clearVersionControl();
};
