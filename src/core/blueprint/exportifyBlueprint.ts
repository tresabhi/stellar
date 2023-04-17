import exportifyPart from 'core/part/exportifyPart';
import { Blueprint, vanillaBlueprintData } from 'game/Blueprint';
import { PartWithStage } from 'game/parts/PartWithStage';
import { cloneDeep } from 'lodash';

export default function exportifyBlueprint(blueprint: Blueprint) {
  const clonedBlueprint = cloneDeep(blueprint);
  const exportifiedBlueprint = cloneDeep(vanillaBlueprintData);

  exportifiedBlueprint.center = clonedBlueprint.center;
  exportifiedBlueprint.offset = clonedBlueprint.offset;

  exportifiedBlueprint.stages = clonedBlueprint.stages.map((stage, index) => ({
    stageId: index + 1,
    partIndexes: [],
  }));

  clonedBlueprint.part_order.forEach((id) => {
    const part = clonedBlueprint.parts[id];
    const [exportifiedParts, originalParts] = exportifyPart(
      part,
      clonedBlueprint,
    );

    exportifiedParts.forEach((exportifiedPart, index) => {
      const originalPart = originalParts[index];
      exportifiedBlueprint.parts.push(exportifiedPart);

      if ((originalPart as PartWithStage).stage !== undefined) {
        exportifiedBlueprint.stages[
          (originalPart as PartWithStage).stage as number
        ].partIndexes.push(exportifiedBlueprint.parts.length - 1);
      }
    });
  });

  return exportifiedBlueprint;
}
