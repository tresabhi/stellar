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

export const getComponentDefaultDataFromComponentName = (
  componentName: string,
) => {
  return components[componentName].defaultData;
};

export const getComponentDefaultDataFromPartName = (partName: string) => {
  alert(getComponentFromPartName(partName).defaultData());
  return getComponentFromPartName(partName).defaultData;
};

export const updatePartData = (partData: Root.dataType) =>
  merge(getComponentDefaultDataFromPartName(partData.n), partData);
