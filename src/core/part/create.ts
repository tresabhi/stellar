import { Part } from 'game/parts/Part';
import { cloneDeep } from 'lodash';
import { ParentId } from 'types/Parts';
import generateId from './generateId';
import getPartRegistry from './getPartRegistry';

export default function create<Type extends Part>(
  name: string,
  id?: string,
  parentId?: ParentId,
) {
  const partData = getPartRegistry(name)?.data;

  if (partData) {
    const newPart = cloneDeep(partData);

    (newPart.id as string) = id ?? generateId();
    newPart.parent_id = parentId ?? null;

    return newPart as Type;
  }
  return null;
}
