import '@react-three/fiber';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import DeepPartial from 'core/types/DeepPartial';
import { FC, memo } from 'react';
import { FuelTankType, FuelTankVanillaType } from './FuelTank';
import { GroupType } from './Group';

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

export type AnyVanillaPartType = FuelTankVanillaType;
export type AnyPartType = FuelTankType | GroupType;
export type AnySavedPartType = AnyPartType & { relations: never };

export type AnyPartialPartType = DeepPartial<AnyPartType>;
export type AnyPartialVanillaPartType = DeepPartial<AnyVanillaPartType>;

export type PartModule = {
  VANILLA_DATA?: AnyVanillaPartType | undefined;
  DATA: AnyPartType;

  Icon: FC<any>;

  LayoutComponent: FC<any>;
};
