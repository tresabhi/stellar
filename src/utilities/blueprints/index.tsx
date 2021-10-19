import { merge } from 'lodash';
import { updatePartData } from '../parts';
import { type as rootPartType } from '../parts/Root';
import {
  data as defaultBlueprintData,
  type as rootBlueprintType,
} from './Root';

export const mergeBlueprintGlobals = (blueprint: Object): rootBlueprintType => {
  return merge(defaultBlueprintData, blueprint);
};

export const blueprintToLatestVersion = (
  blueprint: rootBlueprintType,
): rootBlueprintType => blueprint;

/**
 *Procedure
 *1. Merge whole blueprint with default data
 *2. Merge all parts their with default data
 *3. Use version updaters
 */
export const updateBlueprint = (
  blueprint: Object | rootBlueprintType,
): rootBlueprintType => {
  let updatedBlueprint = mergeBlueprintGlobals(blueprint);
  updatedBlueprint = blueprintToLatestVersion(updatedBlueprint);
  updatedBlueprint.parts = updatePartsData(updatedBlueprint.parts);

  return updatedBlueprint;
};

export const updatePartsData = (parts: Array<rootPartType>) =>
  parts.map((part) => updatePartData(part));
