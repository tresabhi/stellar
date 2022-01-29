import { AnyPartName, AnyPart, AnyVanillaPart } from 'core/types/Parts';
import getPart from 'functions/getPart';
import { cloneDeep, merge } from 'lodash';
import { GroupType } from 'parts/Group';
import RootPart from 'parts/Root';

const NAMED_PART_MODULES: Record<AnyPartName, PartModule> = {
  'Fuel Tank': FuelTankPart,
  Group: GroupPart,
};

export const importifyPartData = (
  partData: AnyVanillaPart | AnyPart,
  parentPointer?: GroupType,
): AnyPart => {
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

export const getPartModule = (partName: AnyPartName) =>
  NAMED_PART_MODULES[partName];
