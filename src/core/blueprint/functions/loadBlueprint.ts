import {
  Blueprint,
  BlueprintData,
  SavedBlueprint,
  VanillaBlueprint,
} from 'game/Blueprint';
import blueprintStore from 'hooks/useBlueprint';
import { blueprintImportify } from './blueprintImportify';
import { clearVersionControl } from './clearVersionControl';

export const loadBlueprint = (
  importData?: VanillaBlueprint | SavedBlueprint | Blueprint,
) => {
  blueprintStore.setState(blueprintImportify(importData ?? BlueprintData));
  clearVersionControl();
};
