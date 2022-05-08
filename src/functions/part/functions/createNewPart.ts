import { Part } from 'game/parts/Part';
import { cloneDeep } from 'lodash';
import { ParentID, UUID } from 'types/Parts';
import { v4 as UUIDV4 } from 'uuid';
import { getPartRegistry } from './getPartRegistry';

export const createNewPart = <Type extends Part>(
  partName: string,
  ID?: UUID,
  parentID?: ParentID,
) => {
  const partData = getPartRegistry(partName)?.data;

  if (partData) {
    const newPart = cloneDeep(partData);

    (newPart.ID as string) = ID ?? UUIDV4();
    newPart.parentID = parentID ?? null;

    return newPart as Type;
  }
};
