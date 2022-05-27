import { cloneDeep, merge } from 'lodash';
import { AnyPart, AnyVanillaPart, ParentId } from 'types/Parts';
import { getPartRegistry } from './getPartRegistry';

export const partImportify = (
  part: AnyVanillaPart | AnyPart,
  id: string,
  parentId?: ParentId,
) => {
  const clonedPartData = cloneDeep(part);
  const clonedDefaultData = cloneDeep(getPartRegistry(clonedPartData.n)?.data);

  if (clonedDefaultData) {
    const newPart = merge(clonedDefaultData, clonedPartData, {
      id,
      parentId: parentId ?? null,
    }) as AnyPart;

    return newPart;
  }
};
