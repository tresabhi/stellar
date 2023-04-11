import { Blueprint, blueprintData, VanillaBlueprint } from 'game/Blueprint';
import useBlueprint from 'stores/blueprint';
import clearVersionControl from './clearVersionControl';
import importifyBlueprint from './importifyBlueprint';

export default function loadBlueprint(
  importData?: VanillaBlueprint | Blueprint,
) {
  const importifiedBlueprint = importifyBlueprint(importData ?? blueprintData);

  if (importifiedBlueprint) {
    useBlueprint.setState(importifiedBlueprint);
    clearVersionControl();
  }
}
