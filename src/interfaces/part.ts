import FuelTank from 'classes/Blueprint/parts/FuelTank';
import Group from 'classes/Blueprint/parts/Group';
import { cloneDeep, isArray, isMap } from 'lodash';
import {
  AnyPartMap,
  Blueprint,
  SavifiedBlueprint,
  VanillaBlueprint,
} from 'types/Blueprint';
import {
  AnyPart,
  AnyPartClass,
  AnyPartName,
  AnySavedPart,
  PartID,
  PartIDs,
} from 'types/Parts';
import { v4 as UUIDV4 } from 'uuid';

const PartClasses = new Map<AnyPartName, AnyPartClass>([
  ['Fuel Tank', FuelTank],
  ['Group', Group],
]);

export const importifyPart = <Type extends AnySavedPart>(
  partData: Type,
  ID: PartID,
  parentID?: PartID,
): AnyPart | undefined => {
  const PartClass = getPartClass(partData.n);

  if (PartClass) {
    let newPart = new PartClass();

    // TODO: find a way to remove this any
    newPart.import({
      ...(partData as any),

      ID,
      parentID,
    });

    return newPart;
  }
};

export const importifyParts = (
  blueprint: VanillaBlueprint | SavifiedBlueprint | Blueprint,
  parentID?: PartID,
): [AnyPartMap, PartIDs] => {
  const newPartsMap: AnyPartMap = new Map();
  const clonedBlueprint = cloneDeep(blueprint);

  if (isMap(clonedBlueprint.parts)) {
    // normal blueprint, probably never gonna use this
    (clonedBlueprint as Blueprint).parts.forEach((part, ID) => {
      const importifiedPart = importifyPart(cloneDeep(part), ID, parentID);
      if (importifiedPart) newPartsMap.set(ID, importifiedPart);
    });

    return [newPartsMap, (clonedBlueprint as Blueprint).partOrder];
  } else if (clonedBlueprint.parts.length === 0) {
    // not parts to convert
    return [newPartsMap, []];
  } else if (isArray(clonedBlueprint.parts[0])) {
    // saved version of the blueprint
    (clonedBlueprint as SavifiedBlueprint).parts.forEach(([ID, part]) => {
      const importifiedPart = importifyPart(cloneDeep(part), ID, parentID);
      if (importifiedPart) newPartsMap.set(ID, importifiedPart);
    });

    return [newPartsMap, (clonedBlueprint as Blueprint).partOrder];
  } else {
    // vanilla blueprint, straight from the game
    let newPartOrder: PartIDs = [];

    (clonedBlueprint as Blueprint).partOrder = [];
    (clonedBlueprint as VanillaBlueprint).parts.forEach((part) => {
      const ID = UUIDV4();
      const importifiedPart = importifyPart(cloneDeep(part), ID, parentID);
      if (importifiedPart) {
        newPartsMap.set(ID, importifiedPart);
        newPartOrder.push(ID);
      }
    });

    return [newPartsMap, newPartOrder];
  }
};

export const getPartClass = (name: AnyPartName) => PartClasses.get(name)!;
