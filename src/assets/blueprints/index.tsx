import { updatePartData } from 'core/hooks/useBlueprint/parts';
import * as RootPart from 'core/hooks/useBlueprint/parts/Root';
import { merge } from 'lodash';
import * as RootBlueprint from './Root';

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

    parts: updatePartsData(latestVersionBlueprint.parts),
  };

  return partDataUpdatedBlueprint;
};

export const updatePartsData = (
  parts: Array<RootPart.allVanillaPartTypes> | Array<RootPart.allPartTypes>,
): Array<RootPart.allPartTypes> => parts.map((part) => updatePartData(part));
