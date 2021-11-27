import '@react-three/fiber';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';
import { memo } from 'react';
import * as FuelTankPart from './fuelTank';
import * as GroupPart from './group';

export const icon = LockIcon;

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
  t: '-Infinity' as '-Infinity',
};

// TODO: SPLIT ALL PART DATA TO VANILLA AND STELLAR VERSIONS

export const data = {
  ...vanillaData,

  '.stellar': {
    label: 'Internally Unlabeled Part',
    visible: true,
    locked: false,
    selected: false,
  },
};

export type type = typeof data;

export type anyPartType = FuelTankPart.type | GroupPart.type;

export type anyVanillaPartType = FuelTankPart.vanillaType;

export const Component = memo(() => <mesh />);
