import * as PartsAPI from 'core/APIs/parts';
import * as RootPart from 'core/APIs/parts/root';
import { merge } from 'lodash';
import * as RootBlueprint from './root';

export const mergeToDefaultBlueprint = (
  blueprint: RootBlueprint.vanillaType | Object,
): RootBlueprint.type => {
  return merge(RootBlueprint.data, blueprint);
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
  const mergedBlueprint = mergeToDefaultBlueprint(blueprint);
  const latestVersionBlueprint = blueprintToLatestVersion(mergedBlueprint);
  const partDataUpdatedBlueprint = {
    ...latestVersionBlueprint,

    // TODO: remove this any
    parts: updatePartsData(latestVersionBlueprint.parts as any),
  };

  return partDataUpdatedBlueprint;
};

export const updatePartsData = (
  parts: Array<RootPart.anyVanillaPartType> | Array<RootPart.anyPartType>,
): Array<RootPart.anyPartType> =>
  parts.map((part) => PartsAPI.updatePartData(part));
