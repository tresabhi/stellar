import exportifyPart from 'core/part/exportifyPart';
import { Blueprint, vanillaBlueprintData } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import { PartWithStages } from 'game/parts/PartWithStages';
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
      const originalPart = originalParts[index] as Part &
        Partial<PartWithStages>;
      exportifiedBlueprint.parts.push(exportifiedPart);

      // if ((originalPart as PartWithStage).stages !== undefined) {
      //   exportifiedBlueprint.stages[
      //     (originalPart as PartWithStage).stages as number
      //   ].partIndexes.push(exportifiedBlueprint.parts.length - 1);
      // }
    });
  });

  return exportifiedBlueprint;
}
