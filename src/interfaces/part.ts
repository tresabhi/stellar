import { AnyPartType, AnyVanillaPartType } from 'core/types/Parts';
import getPart from 'functions/getPart';
import { cloneDeep, merge } from 'lodash';
import { GroupType } from 'parts/Group';
import RootPart from 'parts/Root';

export const importifyPartData = (
  partData: AnyVanillaPartType | AnyPartType,
  parentPointer?: GroupType,
): AnyPartType => {
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

// export const savifyPartData = (partData: AnyPartType, clone = true) => {};
