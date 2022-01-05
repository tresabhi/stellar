import '@react-three/fiber';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';
import DeepPartial from 'core/types/DeepPartial';
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
    label: 'Unknown Part',
    visible: true,
    locked: false,
  },
};

export type Type = typeof data;

export type AnyPartType = FuelTankPart.Type | GroupPart.Type;
export type AnyVanillaPartType = FuelTankPart.VanillaType;

export type AnyPartialPartType = DeepPartial<AnyPartType>;
export type AnyPartialVanillaPartType = DeepPartial<AnyVanillaPartType>;

export const Component = memo(() => <mesh />);
