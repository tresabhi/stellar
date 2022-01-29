import { AnyPart, AnyVanillaPart } from 'core/types/Parts';
import * as PartsAPI from 'interfaces/part';
import { cloneDeep } from 'lodash';
import { Group } from 'parts/Group';
import { v4 } from 'uuid';
import { Blueprint, VanillaBlueprint } from '../../core/types/Blueprint';

export const VanillaBlueprintData: VanillaBlueprint = {
  center: 0,
  offset: { x: 0, y: 0 },
  parts: [],
  stages: [],
};

export const BlueprintData: Blueprint = {
  ...VanillaBlueprintData,

  meta: {
    format_version: 1,
  },
};

/**
 * Merges the given blueprint into the default blueprint.
 */
export const mergeWithDefaultBlueprintGlobals = (
  blueprint: object,
): Blueprint => {
  return { ...BlueprintData, ...blueprint };
};

/**
 * Updates the given blueprint to compensate for changes in the format.
 */
export const blueprintToLatestVersion = (blueprint: Blueprint): Blueprint =>
  blueprint;

/**
 * Prepares the given blueprint for use in the editor.
 *
 * Procedure:
 * 1. Merge whole blueprint with default data
 * 2. Merge all parts their with default data
 * 3. Use version updaters
 */
export const importifyBlueprint = (blueprint: object): Blueprint => {
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
export const savifyBlueprint = (blueprint: Blueprint) => cloneDeep(blueprint);

/**
 * Prepares all parts for use in the editor.
 */
export const importifyPartsData = (
  parts: AnyVanillaPart[] | AnyPart[],
  parent?: Group,
): AnyPart[] => {
  return parts.map((part) => {
    if (part.n === 'Group') {
      let newPart = {
        ...PartsAPI.importifyPartData(part, parent),
        parts: importifyPartsData(part.parts, part),
      };

      newPart.meta.ID = v4();
      newPart.meta.parentID = parent?.meta.ID;

      return newPart;
    } else {
      return PartsAPI.importifyPartData(part, parent);
    }
  });
};
