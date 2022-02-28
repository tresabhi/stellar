import { cloneDeep, isArray, merge } from 'lodash';
import DefaultPart from 'parts/Default';
import FuelTank from 'parts/FuelTank';
import Group from 'parts/Group';
import { AnyPartMap, PartAddress } from 'types/Blueprint';
import { AnyPart, AnyPartName, AnyVanillaPart, PartModule } from 'types/Parts';
import { v4 as UUIDV4 } from 'uuid';

const NAMED_PART_MODULES: Record<AnyPartName, PartModule> = {
  'Fuel Tank': FuelTank,
  Group: Group,
};

export const importifyPartData = (
  partData: AnyVanillaPart | AnyPart,
  partAddress: PartAddress,
): AnyPart | undefined => {
  const partModule = getPartModule(partData.n);

  if (partModule) {
    let newPart = merge({}, partModule.data, partData);

    newPart.meta.address = partAddress;

    return newPart;
  }
};

export const importifyPartsData = (
  parts: AnyVanillaPart[] | AnyPartMap,
  parentAddress: PartAddress,
): AnyPartMap => {
  if (isArray(parts)) {
    // return new Map(
    //   parts.map((part) => {
    //     return [UUIDV4(), importifyPartData(cloneDeep(part), parentAddress)];
    //   }),
    // );
    let newPartsMap: AnyPartMap = new Map();

    parts.forEach((part) => {
      const importifiedPart = importifyPartData(cloneDeep(part), parentAddress);
      if (importifiedPart) newPartsMap.set(UUIDV4(), importifiedPart);
    });

    return newPartsMap;
  } else {
    let newParts = cloneDeep(parts);

    newParts.forEach((part, id) => {
      const importifiedPart = importifyPartData(part, [...parentAddress, id]);
      if (importifiedPart) newParts.set(id, importifiedPart);
    });

    return newParts;
  }
};

// export const savifyPartData = (partData: AnyPartType, clone = true) => {};

export function getPartModule<D extends boolean>(
  partName: AnyPartName,
  useDefault?: D,
): D extends true ? PartModule : PartModule | undefined {
  const module: PartModule | undefined = (NAMED_PART_MODULES as any)[partName];

  if (useDefault) {
    return module ?? DefaultPart;
  } else {
    return module!;
  }
}
