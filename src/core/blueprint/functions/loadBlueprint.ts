import {
  Blueprint,
  BlueprintData,
  SavedBlueprint,
  VanillaBlueprint,
} from 'game/Blueprint';
import useBlueprint from 'hooks/useBlueprint';
import { blueprintImportify } from './blueprintImportify';
import { clearVersionControl } from './clearVersionControl';

export const loadBlueprint = (
  importData?: VanillaBlueprint | SavedBlueprint | Blueprint,
) => {
  useBlueprint.setState(blueprintImportify(importData ?? BlueprintData));
  clearVersionControl();
};
