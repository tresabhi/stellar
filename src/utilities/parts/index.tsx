import { merge } from 'lodash';
import { ModuleReference } from 'typescript';
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

export const getComponentFromPartName = (partName: string) => {
  const componentName = getComponentNameFromPartName(partName);
  return components[componentName];
};

export const getMeshFromPartName = (partName: string, highPoly = true) => {
  const component = getComponentFromPartName(partName);
  const poly = highPoly ? 'HighPoly' : 'LowPoly';
  return component[poly];
};

export const getComponentDataFromComponentName = (componentName: string) => {
  return components[componentName].data;
};

export const getComponentDataFromPartName = (partName: string) => {
  return getComponentFromPartName(partName).data;
};

export const updatePartData = (partData: Root.type) =>
  merge(getComponentDataFromPartName(partData.n), partData);
