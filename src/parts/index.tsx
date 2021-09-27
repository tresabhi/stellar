import { Part as FuelTank } from './FuelTank';
import { Part as Root } from './FuelTank';

const PartComponentNames = new Map([
  ['Root', 'Root'],

  ['Fuel Tank', 'FuelTank'],
]);

const Components: any = {
  Root,

  FuelTank,
};

export const getComponentNameFromPartName = (partName: string): string => PartComponentNames.get(partName) ?? 'Root';
export const getComponentFromPartName = (partName: string) => Components[getComponentNameFromPartName(partName) ?? 'Root'];
