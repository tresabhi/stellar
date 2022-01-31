import { cloneDeep, merge } from 'lodash';
import { DefaultPartData } from 'parts/Default';
import FuelTank from 'parts/FuelTank';
import Group from 'parts/Group';
import { PartAddress } from 'types/Blueprint';
import { AnyPart, AnyPartName, AnyVanillaPart, PartModule } from 'types/Parts';

const NAMED_PART_MODULES: Record<AnyPartName, PartModule> = {
  'Fuel Tank': FuelTank,
  Group: Group,
};

export const importifyPartData = (
  partData: AnyVanillaPart | AnyPart,
  parentAddress: PartAddress,
  partRoute: number,
): AnyPart => {
  const plainPartData = getPartModule(partData.n).data;

  // don't loose object pointers
  let importifiedPartData = merge(
    cloneDeep(plainPartData ?? DefaultPartData),
    partData,
  );

  importifiedPartData.meta.parentAddress = parentAddress;
  importifiedPartData.meta.address = [...parentAddress, partRoute];

  return importifiedPartData;
};

// export const savifyPartData = (partData: AnyPartType, clone = true) => {};

export const getPartModule = (partName: AnyPartName) =>
  NAMED_PART_MODULES[partName];
