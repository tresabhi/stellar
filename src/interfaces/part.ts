import FuelTank from 'classes/Parts/FuelTank';
import Group from 'classes/Parts/Group';
import { AnyPartClass } from 'types/Parts';

const PartClasses = new Map<string, AnyPartClass>([
  ['Fuel Tank', FuelTank],
  ['Group', Group],
]);

/*
export const importifyPart = <Type extends AnySavedPart>(
  partData: Type,
  ID: PartID,
  parentID?: PartID,
) => {
  const part = createNewPart(partData.n, ID, parentID);

  if (part) {
    part.hydrate(partData as ExportedPart);
    return part;
  }
};

export const importifyParts = (
  blueprint: VanillaBlueprint | SavifiedBlueprint | Blueprint,
  parentID?: PartID,
): [AnyPartMap, PartID[]] => {
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
    let newPartOrder: PartID[] = [];

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
*/

export const getPartClass = (name: string) => PartClasses.get(name);
