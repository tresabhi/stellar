import { cloneDeep, isArray, isMap, merge } from 'lodash';
import DefaultPart from 'parts/Default';
import FuelTank from 'parts/FuelTank';
import Group from 'parts/Group';
import { AnyPartMap, SavifiedPartMap } from 'types/Blueprint';
import {
  AnyPart,
  AnyPartName,
  AnyVanillaPart,
  PartModule,
  UUID,
} from 'types/Parts';
import { v4 as UUIDV4 } from 'uuid';

const NAMED_PART_MODULES: Record<AnyPartName, PartModule> = {
  'Fuel Tank': FuelTank,
  Group: Group,
};

export const importifyPart = (
  partData: AnyVanillaPart | AnyPart,
  parentID?: UUID,
): AnyPart | undefined => {
  const partModule = getPartModule(partData.n);

  if (partModule) {
    let newPart = merge(cloneDeep(partModule.data), partData);
    newPart.meta.parent = parentID;

    return newPart;
  }
};

export const importifyParts = (
  parts: AnyVanillaPart[] | AnyPartMap | SavifiedPartMap,
  parentID?: UUID,
): AnyPartMap => {
  let newPartsMap: AnyPartMap = new Map();

  if (isMap(parts)) {
    parts.forEach((part, ID) => {
      const importifiedPart = importifyPart(cloneDeep(part), parentID);
      if (importifiedPart) newPartsMap.set(ID, importifiedPart);
    });

    return newPartsMap;
  } else if (parts.length === 0) {
    return newPartsMap;
  } else if (isArray(parts[0])) {
    (parts as SavifiedPartMap).forEach(([ID, part]) => {
      const importifiedPart = importifyPart(cloneDeep(part), parentID);
      if (importifiedPart) newPartsMap.set(ID, importifiedPart);
    });

    return newPartsMap;
  } else {
    (parts as AnyVanillaPart[]).forEach((part) => {
      const importifiedPart = importifyPart(cloneDeep(part), parentID);
      if (importifiedPart) newPartsMap.set(UUIDV4(), importifiedPart);
    });

    return newPartsMap;
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
