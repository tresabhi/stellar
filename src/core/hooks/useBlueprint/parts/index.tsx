import { cloneDeep, merge } from 'lodash';
import { FC } from 'react';
import * as FuelTank from './FuelTank';
import * as Root from './Root';

export type partFile = {
  data: Root.type;
  type: Root.type;
  Component: FC;
  icon: JSX.Element;
};

export type rootComponentProps = {
  data: Root.type;
};

const partComponentNames = new Map([
  ['Root', 'Root'],
  ['Fuel Tank', 'FuelTank'],
]);

const components: any = {
  Root,
  FuelTank,
};

export const getComponentNameFromPartName = (partName: string): string =>
  partComponentNames.get(partName) ?? 'Root';

export const getAllFromPartName = (partName: string): partFile | undefined => {
  const componentName = getComponentNameFromPartName(partName);
  return components[componentName];
};

export const getComponentFromPartName = (
  partName: string,
): FC<rootComponentProps> | undefined => {
  return getAllFromPartName(partName)?.Component;
};

export const getComponentDataFromPartName = (partName: string) => {
  return getAllFromPartName(partName)?.data;
};

export const updatePartData = (partData: { n: string }): Root.type => {
  return merge(cloneDeep(getComponentDataFromPartName(partData.n)), partData);
};

export const getIconComponentFromPartName = (partName: string) => {
  return getAllFromPartName(partName)?.icon;
};
