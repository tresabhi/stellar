import * as GroupPart from 'core/API/part/types/group';
import * as RootPart from 'core/API/part/types/root';
import { cloneDeep, merge } from 'lodash';
import { FC, SVGProps } from 'react';
import { Type } from 'typescript';
import * as FuelTankPart from './types/fuelTank';

export type PartModule = {
  type: Type;
  data: RootPart.AnyPartType;
  Component: FC;
  icon: FC<SVGProps<SVGSVGElement>>;
};

export interface RootPartComponentProps {
  data: RootPart.AnyPartType;
}

// TODO: Fix this `any` type.
const partComponentNames: { [key: string]: any } = {
  Root: RootPart,
  'Fuel Tank': FuelTankPart,
  Group: GroupPart,
};

/**
 * Gets the module for the given part.
 * @param partName The name of the part to get the module for
 * @returns The module for the given part
 */
export const getPartModule = (partName: string): PartModule | undefined => {
  return partComponentNames[partName];
};

/**
 *
 * @param partName The name of the part to get the component for
 * @returns TODO: DOCS LEFT HERE
 */
export const getPartComponent = (
  partName: string,
): FC<RootPartComponentProps> | undefined => {
  return getPartModule(partName)?.Component;
};

export const getPartData = (partName: string) => {
  return getPartModule(partName)?.data;
};

export const importifyPartData = (
  partData: RootPart.AnyVanillaPartType | RootPart.AnyPartType,
  parentPointer?: GroupPart.Type,
): RootPart.AnyPartType => {
  let importifiedPartData: RootPart.AnyPartType = merge(
    partData,
    merge(
      cloneDeep(getPartData(partData.n) ?? RootPart.data),
      cloneDeep(partData),
    ),
  );

  importifiedPartData.relations.partPointer = importifiedPartData;
  importifiedPartData.relations.parentPointer = parentPointer;

  return importifiedPartData;
};

export const savifyPartData = (
  partData: RootPart.AnyPartType,
  clone = true,
) => {
  let newPart = clone ? cloneDeep(partData) : partData;

  delete (newPart as RootPart.AnySavedPartType).relations;

  if (newPart.n === 'Group') {
    newPart.parts.forEach((part, index) => {
      (newPart as GroupPart.Type).parts[index] = savifyPartData(part, clone);
    });
  }

  return newPart;
};

export const getPartIconComponent = (
  partName: string,
): FC<SVGProps<SVGSVGElement>> | undefined => {
  return getPartModule(partName)?.icon;
};
