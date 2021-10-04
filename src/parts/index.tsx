import { ClassType } from 'react';
import * as FuelTank from './FuelTank';
import * as Root from './Root';

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

export const getComponentFromPartName = (partName: string, highPoly = true) =>
  Components[getComponentNameFromPartName(partName) ?? 'Root'][
    highPoly ? 'HighPoly' : 'LowPoly'
  ];

export const getComponentDataFromComponentName = (partName: string) =>
  Components[partName].Data;
