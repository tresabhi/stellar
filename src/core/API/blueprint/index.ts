import * as PartsAPI from 'core/API/parts';
import { GroupType } from 'core/parts/Group';
import { cloneDeep } from 'lodash';
import * as RootBlueprint from './types/root';

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
    parts: importifyPartsData(mergedBlueprint.parts),
  };
  const latestVersionBlueprint = blueprintToLatestVersion(
    partDataUpdatedBlueprint,
  );

  return latestVersionBlueprint;
};

/**
 * Gets blueprint ready to save locally
 */
export const savifyBlueprint = (blueprint: RootBlueprint.Type) => {
  const newBlueprint = cloneDeep(blueprint);

  newBlueprint.parts.forEach((part, index) => {
    newBlueprint.parts[index] = PartsAPI.savifyPartData(part);
  });

  return newBlueprint;
};

/**
 * Prepares all parts for use in the editor.
 */
export const importifyPartsData = (
  parts: RootBlueprint.AnyVanillaPartTypeArray | RootBlueprint.AnyPartTypeArray,
  parentPointer?: GroupType,
): RootBlueprint.AnyPartTypeArray => {
  return parts.map((part) => {
    if (part.n === 'Group') {
      let newPart = {
        ...PartsAPI.importifyPartData(part, parentPointer),
        parts: importifyPartsData(part.parts, part),
      };

      newPart.relations.self = newPart;
      newPart.relations.parent = parentPointer;

      return newPart;
    } else {
      return PartsAPI.importifyPartData(part, parentPointer);
    }
  });
};
