import * as RootPart from 'core/API/part/types/root';
import { cloneDeep, merge } from 'lodash';
import { FC, SVGProps } from 'react';
import { Type } from 'typescript';
import * as FuelTank from './types/fuelTank';
import * as Group from './types/group';
import * as Root from './types/root';

export type partModule = {
  type: Type;
  data: Root.type;
  Component: FC;
  icon: FC<SVGProps<SVGSVGElement>>;
};

export type RootPartComponentProps = {
  data: Root.type;
};

// TODO: Fix this any
const partComponentNames: { [key: string]: any } = {
  Root,
  'Fuel Tank': FuelTank,
  Group,
};

export const getPartModule = (partName: string): partModule | undefined => {
  return partComponentNames[partName];
};

export const getPartComponent = (
  partName: string,
): FC<RootPartComponentProps> | undefined => {
  return getPartModule(partName)?.Component;
};

export const getPartData = (partName: string) => {
  return getPartModule(partName)?.data;
};

export const updatePartData = (
  partData: RootPart.anyVanillaPartType | RootPart.anyPartType,
): RootPart.anyPartType => {
  return merge(cloneDeep(getPartData(partData.n) ?? Root.data), partData);
};

export const getPartIconComponent = (
  partName: string,
): FC<SVGProps<SVGSVGElement>> | undefined => {
  return getPartModule(partName)?.icon;
};
