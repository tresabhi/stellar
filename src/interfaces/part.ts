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
): AnyPart => {
  const defaultData = getPartModule(partData.n, true).data;
  let newPart = merge({}, defaultData, partData);

  newPart.meta.address = partAddress;

  return newPart;
};

export const importifyPartsData = (
  parts: AnyVanillaPart[] | AnyPartMap,
  parentAddress: PartAddress,
): AnyPartMap => {
  if (isArray(parts)) {
    return new Map(
      parts.map((part) => {
        return [UUIDV4(), importifyPartData(cloneDeep(part), parentAddress)];
      }),
    );
  } else {
    let newParts = cloneDeep(parts);

    newParts.forEach((part, id) => {
      newParts.set(id, importifyPartData(part, [...parentAddress, id]));
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
