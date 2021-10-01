import { Function, Object } from 'lodash';
import React from 'react';

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

export const getComponentFromPartName = (
  partName: string,
  highPoly?: boolean,
) =>
  Components[getComponentNameFromPartName(partName) ?? 'Root'][
    highPoly ?? true ? 'HighPoly' : 'LowPoly'
  ];
