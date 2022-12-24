import { Part, VanillaPart } from 'game/parts/Part';
import { cloneDeep, merge } from 'lodash';
import { ParentId } from 'types/Parts';
import getPartRegistry from './getPartRegistry';

export default function partImportify(
  part: VanillaPart | Part,
  id: string,
  parentId?: ParentId,
) {
  const clonedPartData = cloneDeep(part);
  const clonedDefaultData = cloneDeep(getPartRegistry(clonedPartData.n)?.data);

  if (clonedDefaultData) {
    const newPart = merge(clonedDefaultData, clonedPartData, {
      id,
      parentId: parentId ?? null,
    });

    return newPart;
  }
  return null;
}
