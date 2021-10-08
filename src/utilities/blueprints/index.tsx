import { merge } from 'lodash';
import { updatePartData } from '../parts';
import { dataType as rootPartType } from '../parts/Root';
import defaultBlueprint from './default.json';
import { dataType as rootBlueprintType } from './root';

export const mergeBlueprintGlobals = (blueprint: Object) =>
  merge<rootBlueprintType, Object>(defaultBlueprint, blueprint);

/**
 *Nothing for now, don't worry about the types yet
 */
export const blueprintToLatestVersion = (
  blueprint: rootBlueprintType,
): rootBlueprintType => blueprint;

/**
 *Procedure
 *1. Merge whole blueprint with default data
 *2. Merge all parts their with default data
 *3. Use version updaters
 */
export const updateBlueprint = (blueprint: Object): rootBlueprintType => {
  let newBlueprint = mergeBlueprintGlobals(blueprint);
  newBlueprint = blueprintToLatestVersion(newBlueprint);
  newBlueprint.parts = updatePartsData(newBlueprint.parts);
  return newBlueprint;
};

export const updatePartsData = (parts: Array<rootPartType>) => {
  return parts.map((currentPart) => updatePartData(currentPart));
};
