import '@react-three/fiber';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';
import { merge } from 'lodash';
import { memo } from 'react';
import * as FuelTank from './FuelTank';

export const icon = <LockIcon />;

export const vanillaData = {
  n: 'Root',
  p: {
    x: 0,
    y: 0,
  },
  o: {
    x: 1,
    y: 1,
    z: 0,
  },
  t: '-Infinity',
};

// TODO: SPLIT ALL PART DATA TO VANILLA AND STELLAR VERSIONS

export const data = {
  ...vanillaData,

  '.stellar': {
    label: 'Internally Unlabeled Part',
    visible: true,
    locked: false,
  },
};

export type type = typeof data;

// TODO: Add more part types here
// Example: fuelTankType | wheelBigType | wheelSmallType
export type allPartsType = FuelTank.type;

export type allVanillaPartsType = FuelTank.vanillaType;

export const Component = memo(() => <mesh />);
