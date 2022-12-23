import { Part } from 'game/parts/Part';
import { cloneDeep } from 'lodash';
import { ParentId } from 'types/Parts';
import generateId from './generateId';
import getPartRegistry from './getPartRegistry';

export default function createNewPart<Type extends Part>(
  partName: string,
  id?: string,
  parent?: ParentId,
) {
  const partData = getPartRegistry(partName)?.data;

  if (partData) {
    const newPart = cloneDeep(partData);

    (newPart.id as string) = id ?? generateId();
    newPart.parent_id = parent ?? null;

    return newPart as Type;
  }
  return null;
}
