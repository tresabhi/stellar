import { partExportify } from 'core/part';
import { Blueprint, VanillaBlueprintData } from 'game/Blueprint';
import { cloneDeep, isArray } from 'lodash';
import { AnyVanillaPart } from 'types/Parts';
import { getPart } from '../../part/functions/getPart';

export const blueprintExportify = (blueprint: Blueprint) => {
  const clonedBlueprint = cloneDeep(blueprint);
  const exportifiedBlueprint = cloneDeep(VanillaBlueprintData);

  exportifiedBlueprint.center = clonedBlueprint.center;
  exportifiedBlueprint.offset = clonedBlueprint.offset;
  exportifiedBlueprint.stages = clonedBlueprint.stages;

  clonedBlueprint.partOrder.forEach((id) => {
    const part = getPart(id, clonedBlueprint);

    if (part) {
      const exportifiedPart = partExportify(part, clonedBlueprint);

      if (exportifiedPart) {
        if (isArray(exportifiedPart)) {
          exportifiedBlueprint.parts.push(
            ...(exportifiedPart as AnyVanillaPart[]),
          );
        } else {
          exportifiedBlueprint.parts.push(exportifiedPart as AnyVanillaPart);
        }
      }
    }
  });

  return exportifiedBlueprint;
};
