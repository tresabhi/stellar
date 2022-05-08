import { exportifyPart } from 'functions/part';
import { Blueprint, VanillaBlueprintData } from 'game/Blueprint';
import { cloneDeep, isArray } from 'lodash';
import { AnyVanillaPart } from 'types/Parts';
import { getPart } from '../../part/functions/getPart';

export const exportifyBlueprint = (blueprint: Blueprint) => {
  const clonedBlueprint = cloneDeep(blueprint);
  const exportifiedBlueprint = cloneDeep(VanillaBlueprintData);

  exportifiedBlueprint.center = clonedBlueprint.center;
  exportifiedBlueprint.offset = clonedBlueprint.offset;
  exportifiedBlueprint.stages = clonedBlueprint.stages;

  clonedBlueprint.partOrder.forEach((ID) => {
    const part = getPart(ID, clonedBlueprint);

    if (part) {
      const exportifiedPart = exportifyPart(part, clonedBlueprint);

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
