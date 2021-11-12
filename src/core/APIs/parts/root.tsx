import '@react-three/fiber';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';
import { memo } from 'react';
import * as FuelTank from './fuelTank';

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

type constantType = {
  t: '-Infinity';
};

export type type = typeof data & constantType;

// TODO: Add more part types here
// Example: fuelTankType | wheelBigType | wheelSmallType
export type anyPartType = FuelTank.type;

export type anyVanillaPartType = FuelTank.vanillaType;

export const Component = memo(() => <mesh />);
