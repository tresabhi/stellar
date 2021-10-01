import React from 'react';

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

export const getComponentNameFromPartName = (partName: string): string =>
  PartComponentNames.get(partName) ?? 'Root';
export const getComponentFromPartName = (
  partName: string,
): React.ReactElement =>
  Components[getComponentNameFromPartName(partName) ?? 'Root'];
