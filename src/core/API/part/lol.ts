import FuelTankPart from 'core/parts/FuelTank';
import GroupPart, { GroupType } from 'core/parts/Group';
import * as RootPart from 'core/parts/Root';
import { cloneDeep, merge } from 'lodash';
import { FC, SVGProps } from 'react';
import { Type } from 'typescript';

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
  parentPointer?: GroupType,
): RootPart.AnyPartType => {
  let importifiedPartData: RootPart.AnyPartType = merge(
    partData,
    merge(
      cloneDeep(getPartData(partData.n) ?? RootPart.DEFAULT_DATA),
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
      (newPart as GroupType).parts[index] = savifyPartData(part, clone);
    });
  }

  return newPart;
};

export const getPartIconComponent = (
  partName: string,
): FC<SVGProps<SVGSVGElement>> | undefined => {
  return getPartModule(partName)?.icon;
};
