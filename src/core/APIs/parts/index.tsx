import * as RootPart from 'core/APIs/parts/root';
import { cloneDeep, merge } from 'lodash';
import { FC } from 'react';
import { Type } from 'typescript';
import * as FuelTank from './fuelTank';
import * as Root from './root';

export type partModule = {
  type: Type;
  data: Root.type;
  Component: FC;
  icon: JSX.Element;
};

export type RootPartComponentProps = {
  data: Root.type;
};

const partComponentNames: { [key: string]: any } = {
  Root,

  'Fuel Tank': FuelTank,
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
  partData: RootPart.anyVanillaPartType,
): RootPart.anyPartType => {
  return merge(cloneDeep(getPartData(partData.n) ?? Root.data), partData);
};

export const getPartIconComponent = (partName: string) => {
  return getPartModule(partName)?.icon;
};
