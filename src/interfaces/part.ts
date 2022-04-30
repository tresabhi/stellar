import { Blueprint } from 'game/Blueprint';
import {
  FuelTankBoundingBoxComputer,
  FuelTankData,
  FuelTankIcon,
  FuelTankLayoutComponent,
  FuelTankPropertyComponent,
  VanillaFuelTankData,
} from 'game/parts/FuelTank';
import {
  exportifyGroup,
  Group,
  GroupBoundingBoxComputer,
  GroupData,
  GroupIcon,
  GroupLayoutComponent,
} from 'game/parts/Group';
import {
  Part,
  PartData as DefaultPartData,
  VanillaPart,
} from 'game/parts/Part';
import { cloneDeep, merge } from 'lodash';
import { FC } from 'react';
import blueprintStore from 'stores/blueprint';
import { Box2, Vector2 } from 'three';
import {
  AnyPart,
  AnyVanillaPart,
  ParentID,
  PartComponentProps,
  PartPropertyComponentProps,
  UUID,
} from 'types/Parts';
import { getPart } from './blueprint';

export type BoundingBoxComputer<Type extends Part> = (state: Type) => Box2;

// #region part repository
export const VanillaPartData = new Map<string, VanillaPart>([
  ['Fuel Tank', VanillaFuelTankData],
]);

export const PartData = new Map<string, Part>([
  ['Fuel Tank', FuelTankData],
  ['Group', GroupData],
]);

export const PartLayoutComponents = new Map<string, FC<PartComponentProps>>([
  ['Fuel Tank', FuelTankLayoutComponent],
  ['Group', GroupLayoutComponent],
]);

export const PartPropertyComponents = new Map<
  string,
  FC<PartPropertyComponentProps>
>([['Fuel Tank', FuelTankPropertyComponent]]);

export const PartIcons = new Map<string, FC>([
  ['Fuel Tank', FuelTankIcon],
  ['Group', GroupIcon],
]);

export const PartBoundingBoxComputers = new Map<
  string,
  BoundingBoxComputer<any> // TODO: any solutions for this any?
>([
  ['Fuel Tank', FuelTankBoundingBoxComputer],
  ['Group', GroupBoundingBoxComputer],
]);

export const PartCustomExportifiers = new Map<
  string,
  (part: any, context: Blueprint) => object | object[] | null
>([['Group', exportifyGroup]]);
// #endregion

// #region part repository getters
export const getVanillaPartData = (partName: string) =>
  VanillaPartData.get(partName);

export const getPartData = (partName: string) => PartData.get(partName);

export const getPartLayoutComponent = (partName: string) =>
  PartLayoutComponents.get(partName);

export const getPartPropertyComponent = (partName: string) =>
  PartPropertyComponents.get(partName);

export const getPartIcon = (partName: string) => PartIcons.get(partName);

export const getPartBoundingBoxComputer = (partName: string) =>
  PartBoundingBoxComputers.get(partName);

export const getPartCustomExportifier = (partName: string) =>
  PartCustomExportifiers.get(partName);

// #endregion

export const importifyPart = (
  part: AnyVanillaPart | AnyPart,
  ID: UUID,
  parentID?: ParentID,
) => {
  const clonedPart = cloneDeep(part);

  if (getPartData(clonedPart.n)) {
    const defaultPartData = cloneDeep(getPartData(clonedPart.n));

    const newPart = merge(defaultPartData, clonedPart, {
      ID,
      parentID: parentID ?? null,
    }) as AnyPart;

    return newPart;
  }
};

export const ActiveBoundingBoxes = new Map<UUID, Box2>();

export const registerBoundingBox = (ID: UUID) => {
  const part = getPart(ID);

  if (part) {
    const boundingBoxComputer = getPartBoundingBoxComputer(part.n);

    if (boundingBoxComputer) {
      const boundingBox = boundingBoxComputer(part);

      ActiveBoundingBoxes.set(ID, boundingBox);
    }
  }
};

export const disposeBoundingBox = (ID: UUID) => ActiveBoundingBoxes.delete(ID);

export const checkForBoundingBoxIntersection = (point: Vector2) => {
  for (const [ID, boundingBox] of ActiveBoundingBoxes) {
    if (boundingBox.containsPoint(point)) return ID;
  }
};

export const checkForBoundingBoxIntersections = (point: Vector2) => {
  const intersections: UUID[] = [];

  ActiveBoundingBoxes.forEach((boundingBox, ID) => {
    if (boundingBox.containsPoint(point)) intersections.push(ID);
  });

  return intersections;
};

export const checkForClickableBoundingBoxIntersection = (point: Vector2) => {
  const blueprintState = blueprintStore.getState();
  const checked = new Map<UUID, true>();

  const check = (IDs: UUID[]) => {
    let result: UUID | undefined;

    IDs.some((ID) => {
      if (!checked.has(ID)) {
        checked.set(ID, true);

        const part = getPart(ID);

        if (part) {
          if (part.n === 'Group' && part.selected) {
            const groupResult = check((part as Group).partOrder);

            if (groupResult) {
              result = groupResult;

              return true;
            }
          } else {
            const boundingBoxComputer = getPartBoundingBoxComputer(part.n);

            if (boundingBoxComputer) {
              const boundingBox = boundingBoxComputer(part);

              if (boundingBox.containsPoint(point)) {
                result = ID;

                return true;
              }
            }
          }
        }
      }

      return false;
    });

    return result;
  };

  return check(blueprintState.selections) ?? check(blueprintState.partOrder);
};

export const nonExportableKeys = [
  ...Object.keys(DefaultPartData).filter((key) => key !== 'n'),
  'parentID',
];

export const exportifyPart = (
  part: AnyPart,
  context: Blueprint,
  checkForCustomExportifier: boolean = true,
): object | object[] | null => {
  const clonedPart = cloneDeep(part) as AnyVanillaPart;
  const customExporter = getPartCustomExportifier(part.n);

  if (checkForCustomExportifier && customExporter) {
    return customExporter(clonedPart, context);
  } else {
    nonExportableKeys.forEach((key) => {
      delete clonedPart[key];
    });

    return clonedPart;
  }
};
