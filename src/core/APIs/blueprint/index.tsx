import * as PartsAPI from 'core/APIs/parts';
import * as RootPart from 'core/APIs/parts/root';
import * as RootBlueprint from './root';

export const mergeWithDefaultBlueprintGlobals = (
  blueprint: Object,
): RootBlueprint.type => {
  return { ...RootBlueprint.data, ...blueprint };
};

export const blueprintToLatestVersion = (
  blueprint: RootBlueprint.type,
): RootBlueprint.type => blueprint;

/**
 *Procedure
 *1. Merge whole blueprint with default data
 *2. Merge all parts their with default data
 *3. Use version updaters
 */
export const updateBlueprint = (
  blueprint: RootBlueprint.vanillaType | Object,
): RootBlueprint.type => {
  const mergedBlueprint = mergeWithDefaultBlueprintGlobals(blueprint);
  const partDataUpdatedBlueprint = {
    ...mergedBlueprint,
    parts: updatePartsData(mergedBlueprint.parts),
  };
  const latestVersionBlueprint = blueprintToLatestVersion(
    partDataUpdatedBlueprint,
  );

  return latestVersionBlueprint;
};

export const updatePartsData = (
  parts: RootBlueprint.partArrayType,
): Array<RootPart.anyPartType> =>
  parts.map((part) => PartsAPI.updatePartData(part));
