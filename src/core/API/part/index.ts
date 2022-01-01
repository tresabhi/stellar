import * as RootPart from 'core/API/part/types/root';
import { cloneDeep, merge } from 'lodash';
import { FC, SVGProps } from 'react';
import { Type } from 'typescript';
import * as FuelTank from './types/fuelTank';
import * as Group from './types/group';
import * as Root from './types/root';

export interface partModule {
  type: Type;
  data: Root.type;
  Component: FC;
  icon: FC<SVGProps<SVGSVGElement>>;
}

export interface RootPartComponentProps {
  data: Root.type;
}

// TODO: Fix this `any` type.
const partComponentNames: { [key: string]: any } = {
  Root,
  'Fuel Tank': FuelTank,
  Group,
};

/**
 * Gets the module for the given part.
 * @param partName The name of the part to get the module for
 * @returns The module for the given part
 */
export const getPartModule = (partName: string): partModule | undefined => {
  return partComponentNames[partName];
};

// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
/**
 *
 * @param partName The name of the part to get the component for
 * @returns
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
  partData: RootPart.anyVanillaPartType | RootPart.anyPartType,
): RootPart.anyPartType => {
  return merge(cloneDeep(getPartData(partData.n) ?? Root.data), partData);
};

export const getPartIconComponent = (
  partName: string,
): FC<SVGProps<SVGSVGElement>> | undefined => {
  return getPartModule(partName)?.icon;
};
