import * as RootPart from './types/root';
import * as PartsAPI from 'core/API/part';
import * as RootBlueprint from './types/root';
import * as GroupPart from 'core/API/part/types/group';

/**
 * Merges the given blueprint into the default blueprint.
 */
export const mergeWithDefaultBlueprintGlobals = (
  blueprint: object,
): RootBlueprint.Type => {
  return { ...RootBlueprint.data, ...blueprint };
};

/**
 * Updates the given blueprint to compensate for changes in the format.
 */
export const blueprintToLatestVersion = (
  blueprint: RootBlueprint.Type,
): RootBlueprint.Type => blueprint;

/**
 * Prepares the given blueprint for use in the editor.
 *
 * Procedure:
 * 1. Merge whole blueprint with default data
 * 2. Merge all parts their with default data
 * 3. Use version updaters
 */
export const importifyBlueprint = (
  blueprint: RootBlueprint.VanillaType | object,
): RootBlueprint.Type => {
  const mergedBlueprint = mergeWithDefaultBlueprintGlobals(blueprint);
  const partDataUpdatedBlueprint = {
    ...mergedBlueprint,
    parts: importifyPartsData(mergedBlueprint.parts, mergedBlueprint),
  };
  const latestVersionBlueprint = blueprintToLatestVersion(
    partDataUpdatedBlueprint,
  );

  return latestVersionBlueprint;
};

/**
 * Prepares all parts for use in the editor.
 */
export const importifyPartsData = (
  parts: RootBlueprint.AnyVanillaPartTypeArray | RootBlueprint.AnyPartTypeArray,
  parentPointer: GroupPart.Type | RootBlueprint.Type,
): RootBlueprint.AnyPartTypeArray => {
  let newParts: RootBlueprint.AnyPartTypeArray = [];

  parts.forEach((part) => {
    if (part.n === 'Group') {
      newParts.push({
        ...(PartsAPI.importifyPartData(part, parentPointer) as GroupPart.Type),

        parts: importifyPartsData(part.parts, part),
      });
    } else {
      newParts.push(PartsAPI.importifyPartData(part, parentPointer));
    }
  });

  return newParts;
};
