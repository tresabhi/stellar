import { cloneDeep, merge } from 'lodash';
import { AnyPart, AnyVanillaPart, ParentID, UUID } from 'types/Parts';
import { getPartRegistry } from './getPartRegistry';

export const importifyPart = (
  part: AnyVanillaPart | AnyPart,
  ID: UUID,
  parentID?: ParentID,
) => {
  const clonedPartData = cloneDeep(part);
  const clonedDefaultData = cloneDeep(getPartRegistry(clonedPartData.n)?.data);

  if (clonedDefaultData) {
    const newPart = merge(clonedDefaultData, clonedPartData, {
      ID,
      parentID: parentID ?? null,
    }) as AnyPart;

    return newPart;
  }
};
