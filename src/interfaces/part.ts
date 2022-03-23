import { cloneDeep, isArray, isMap, merge } from 'lodash';
import FuelTank from 'parts/FuelTank';
import Group from 'parts/Group';
import {
  AnyPartMap,
  Blueprint,
  SavifiedBlueprint,
  VanillaBlueprint,
} from 'types/Blueprint';
import DeepPartial from 'types/DeepPartial';
import {
  AnyPart,
  AnyPartName,
  AnyVanillaPart,
  PartID,
  PartIDs,
  PartModule,
} from 'types/Parts';
import { v4 as UUIDV4 } from 'uuid';
import Part, { PartExport } from '_parts/Part';

const partModules = new Map<AnyPartName, PartModule>([
  ['Fuel Tank', FuelTank],
  ['Group', Group],
]);

export const importifyPart = (
  partData: AnyVanillaPart | AnyPart,
  parentID?: PartID,
): AnyPart | undefined => {
  const partModule = getPartModule(partData.n);

  let newPart = merge(cloneDeep(partModule.data), partData);
  newPart.meta.parent = parentID;

  return newPart;
};

export const importifyParts = (
  blueprint: VanillaBlueprint | SavifiedBlueprint | Blueprint,
  parentID?: PartID,
): [AnyPartMap, PartIDs] => {
  let newPartsMap: AnyPartMap = new Map();
  const clonedBlueprint = cloneDeep(blueprint);

  if (isMap(clonedBlueprint.parts)) {
    // normal blueprint, probably never gonna use this
    (clonedBlueprint as Blueprint).parts.forEach((part, ID) => {
      const importifiedPart = importifyPart(cloneDeep(part), parentID);
      if (importifiedPart) newPartsMap.set(ID, importifiedPart);
    });

    return [newPartsMap, (clonedBlueprint as Blueprint).partOrder];
  } else if (clonedBlueprint.parts.length === 0) {
    // not parts to convert
    return [newPartsMap, []];
  } else if (isArray(clonedBlueprint.parts[0])) {
    // saved version of the blueprint
    (clonedBlueprint as SavifiedBlueprint).parts.forEach(([ID, part]) => {
      const importifiedPart = importifyPart(cloneDeep(part), parentID);
      if (importifiedPart) newPartsMap.set(ID, importifiedPart);
    });

    return [newPartsMap, (clonedBlueprint as Blueprint).partOrder];
  } else {
    // vanilla blueprint, straight from the game
    let newPartOrder: PartIDs = [];

    (clonedBlueprint as Blueprint).partOrder = [];
    (clonedBlueprint as VanillaBlueprint).parts.forEach((part) => {
      const ID = UUIDV4();
      const importifiedPart = importifyPart(cloneDeep(part), parentID);
      if (importifiedPart) {
        newPartsMap.set(ID, importifiedPart);
        newPartOrder.push(ID);
      }
    });

    return [newPartsMap, newPartOrder];
  }
};

//@ts-ignore
const nonExportableKeys = Object.keys(new Part());
nonExportableKeys.splice(nonExportableKeys.indexOf('n'), 1);
export const basicExport = <T extends PartExport>(
  part: Part<T>,
  otherNonExportableKeys: string[] = [],
) => {
  const DONT_EXPORT = [...otherNonExportableKeys, ...nonExportableKeys];
  const clonedPart = cloneDeep(part);
  let exportObj: Partial<T> = {};

  Object.keys(clonedPart).forEach((key) => {
    const value = (clonedPart as any)[key];

    if (typeof value !== 'function' && !DONT_EXPORT.includes(key)) {
      (exportObj as any)[key] = value;
    }
  });

  return exportObj as T;
};

export const basicImport = <T extends PartExport>(
  part: Part<T>,
  data: DeepPartial<T>,
) => {
  merge(part, data);
};

export const basicSave = <T extends PartExport>(part: Part<T>) => {
  const clonedPart = cloneDeep(part);
  let exportObj: Partial<T> = {};

  Object.keys(clonedPart).forEach((key) => {
    const value = (clonedPart as any)[key];

    if (typeof value !== 'function') {
      (exportObj as any)[key] = value;
    }
  });

  return exportObj as T;
};
