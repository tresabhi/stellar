import getPart from 'core/functions/getPart';
import { GroupType } from 'core/parts/Group';
import * as RootPart from 'core/parts/Root';
import { cloneDeep, merge } from 'lodash';

export const importifyPartData = (
  partData: RootPart.AnyVanillaPartType | RootPart.AnyPartType,
  parentPointer?: GroupType,
): RootPart.AnyPartType => {
  const defaultPartData = getPart(partData.n).DATA;

  // don't loose object pointers
  let importifiedPartData = merge(
    partData,
    merge(cloneDeep(defaultPartData ?? RootPart.DATA), cloneDeep(partData)),
  );

  importifiedPartData.relations.self = importifiedPartData;
  importifiedPartData.relations.parent = parentPointer;

  return importifiedPartData;
};

export const savifyPartData = (
  partData: RootPart.AnyPartType,
  clone = true,
) => {
  let newPart = clone ? cloneDeep(partData) : partData;

  delete (newPart as RootPart.AnySavedPartType).relations;

  if (newPart.n === 'Group') {
    newPart.parts.forEach((part, index) => {
      (newPart as GroupType).parts[index] = savifyPartData(part, clone);
    });
  }

  return newPart;
};
