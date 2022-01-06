import '@react-three/fiber';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';
import * as RootBlueprint from 'core/API/blueprint/types/root';
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

export const data = {
  ...vanillaData,

  identity: {
    label: 'Unknown Part',
    visible: true,
    locked: false,
  },

  relations: {} as RootBlueprint.PartPointer,
};

export type Type = typeof data;

export type AnyPartType = FuelTankPart.Type | GroupPart.Type;
export type AnySavedPartType = AnyPartType & { relations: never };
export type AnyVanillaPartType = FuelTankPart.VanillaType;

export type AnyPartialPartType = DeepPartial<AnyPartType>;
export type AnyPartialVanillaPartType = DeepPartial<AnyVanillaPartType>;

export const Component = memo(() => <mesh />);
