import * as PartsAPI from 'core/API/part';
import * as RootBlueprint from './types/root';
import * as GroupPart from 'core/API/part/types/group';

export const mergeWithDefaultBlueprintGlobals = (
  blueprint: object,
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
  blueprint: RootBlueprint.vanillaType | object,
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
  parts: RootBlueprint.anyVanillaPartTypeArray | RootBlueprint.anyPartTypeArray,
): RootBlueprint.anyPartTypeArray => {
  let newParts: RootBlueprint.anyPartTypeArray = [];

  parts.forEach((part) => {
    if (part.n === 'Group') {
      newParts.push({
        ...(PartsAPI.updatePartData(part) as GroupPart.type),
        parts: updatePartsData(part.parts),
      });
    } else {
      newParts.push(PartsAPI.updatePartData(part));
    }
  });

  return newParts;
};
