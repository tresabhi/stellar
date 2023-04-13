import exportifyPart from 'core/part/exportifyPart';
import { Blueprint, vanillaBlueprintData } from 'game/Blueprint';
import { VanillaPart } from 'game/parts/Part';
import { cloneDeep, isArray } from 'lodash';
import exportifyStage from './exportifyStage';

export default function exportifyBlueprint(blueprint: Blueprint) {
  const clonedBlueprint = cloneDeep(blueprint);
  const exportifiedBlueprint = cloneDeep(vanillaBlueprintData);

  exportifiedBlueprint.center = clonedBlueprint.center;
  exportifiedBlueprint.offset = clonedBlueprint.offset;
  exportifiedBlueprint.stages = clonedBlueprint.stages;

  clonedBlueprint.part_order.forEach((id) => {
    const part = clonedBlueprint.parts[id];
    const exportifiedPart = exportifyPart(part, clonedBlueprint);

    if (exportifiedPart) {
      if (isArray(exportifiedPart)) {
        exportifiedBlueprint.parts.push(...(exportifiedPart as VanillaPart[]));
      } else {
        exportifiedBlueprint.parts.push(exportifiedPart as VanillaPart);
      }
    }
  });

  exportifiedBlueprint.stages.forEach((stage, index) => {
    exportifiedBlueprint.stages[index] = exportifyStage(stage);
  });

  return exportifiedBlueprint;
}
