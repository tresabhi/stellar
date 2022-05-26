import { Blueprint, SavedBlueprint } from 'game/Blueprint';
import { cloneDeep } from 'lodash';

export const blueprintSavify = (blueprint: Blueprint) => {
  const clonedBlueprint = cloneDeep(blueprint);
  const savedBlueprint: SavedBlueprint = {
    ...clonedBlueprint,
    parts: Array.from(clonedBlueprint.parts, (couple) => couple),
  };

  /**
   * boundingBoxes is only a cache that works along side blueprint's version
   * control system, hence, needs to be deleted as it can be regenerated again
   */
  delete (savedBlueprint as any).boundingBoxes;

  return savedBlueprint;
};
