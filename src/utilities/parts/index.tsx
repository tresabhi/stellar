import { cloneDeep, merge } from 'lodash';
import { FC } from 'react';
import * as FuelTank from './FuelTank';
import * as Root from './Root';

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

export const getAllFromPartName = (partName: string): Root.partFile => {
  const componentName = getComponentNameFromPartName(partName);
  return components[componentName];
};

export const getComponentFromPartName = (
  partName: string,
): FC<Root.partComponentProps> => {
  return getAllFromPartName(partName).Component;
};

export const getComponentDataFromPartName = (partName: string): Root.type => {
  return getAllFromPartName(partName).data;
};

export const updatePartData = (partData: Root.minimalType): Root.type => {
  return merge(cloneDeep(getComponentDataFromPartName(partData.n)), partData);
};
