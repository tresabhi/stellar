import * as FuelTank from './FuelTank';
import * as Root from './Root';
import _ from 'lodash';

const PartComponentNames = new Map([
  ['Root', 'Root'],
  ['Fuel Tank', 'FuelTank'],
]);

const Components: any = {
  Root,
  FuelTank,
};

export const getComponentNameFromPartName = (partName: string): string =>
  PartComponentNames.get(partName) ?? 'Root';

export const getComponentFromPartName = (partName: string) =>
  Components[getComponentNameFromPartName(partName) ?? 'Root'];

export const getMeshFromPartName = (partName: string, highPoly = true) => {
  // alert(getComponentFromPartName(partName).HighPoly);
  return getComponentFromPartName(partName)[highPoly ? 'HighPoly' : 'LowPoly'];
};

export const getComponentDataFromComponentName = (partName: string) =>
  Components[partName].Data;

export const updatePartDataWithPartName = (data: { n: string }) =>
  _.merge(data, getComponentFromPartName(data.n).Data);
