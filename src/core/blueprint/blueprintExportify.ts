import { partExportify } from 'core/part';
import { Blueprint, VanillaBlueprintData } from 'game/Blueprint';
import { cloneDeep, isArray } from 'lodash';
import { AnyVanillaPart } from 'types/Parts';

export const blueprintExportify = (blueprint: Blueprint) => {
  const clonedBlueprint = cloneDeep(blueprint);
  const exportifiedBlueprint = cloneDeep(VanillaBlueprintData);

  exportifiedBlueprint.center = clonedBlueprint.center;
  exportifiedBlueprint.offset = clonedBlueprint.offset;
  exportifiedBlueprint.stages = clonedBlueprint.stages;

  clonedBlueprint.part_order.forEach((id) => {
    const part = clonedBlueprint.parts.get(id);

    if (part) {
      const exportifiedPart = partExportify(part, clonedBlueprint);

      if (exportifiedPart) {
        if (isArray(exportifiedPart)) {
          exportifiedBlueprint.parts.push(...(exportifiedPart as AnyVanillaPart[]));
        } else {
          exportifiedBlueprint.parts.push(exportifiedPart as AnyVanillaPart);
        }
      }
    }
  });

  return exportifiedBlueprint;
};
