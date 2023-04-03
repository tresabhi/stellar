import { Blueprint, blueprintData, VanillaBlueprint } from 'game/Blueprint';
import useBlueprint from 'stores/blueprint';
import clearVersionControl from './clearVersionControl';
import importifyBlueprint from './importifyBlueprint';

export default function loadBlueprint(
  importData?: VanillaBlueprint | Blueprint,
  warnMissing = true,
) {
  useBlueprint.setState(
    importifyBlueprint(importData ?? blueprintData, warnMissing),
  );
  clearVersionControl();
}
