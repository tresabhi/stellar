import { merge } from 'lodash';
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

export const getComponentDefaultDataFromComponentName = (partName: string) =>
  components[partName].defaultData;

export const updatePartDataWithPartName = (partData: Root.type) =>
  merge(partData, getComponentFromPartName(partData.n).defaultData);

export const updatePartData = (partData: Root.type) => {
  const component = getComponentFromPartName(partData.n);
  return merge(component.defaultData, partData);
};

export const updatePartsData = (parts: Array<Root.type>) => {
  return parts.map((currentPart) => updatePartData(currentPart));
};
