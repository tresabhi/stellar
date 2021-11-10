import { updatePartData } from 'core/hooks/useBlueprint/parts';
import * as Root from 'core/hooks/useBlueprint/parts/Root';
import { merge } from 'lodash';
import {
  data as defaultBlueprintData,
  type as rootBlueprintType,
} from './Root';

export const mergeToDefaultBlueprint = (
  blueprint: Object,
): rootBlueprintType => {
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
  blueprint: rootBlueprintType,
): rootBlueprintType => {
  let updatedBlueprint = mergeToDefaultBlueprint(blueprint);
  updatedBlueprint = blueprintToLatestVersion(updatedBlueprint);
  updatedBlueprint.parts = updatePartsData(updatedBlueprint.parts);

  return updatedBlueprint;
};

export const updatePartsData = (
  parts: Array<Root.allVanillaPartsType>,
): Array<Root.allPartsType> => parts.map((part) => updatePartData(part));
