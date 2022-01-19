import '@react-three/fiber';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/question-mark.svg';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import DeepPartial from 'core/types/DeepPartial';
import { FC } from 'react';
import { FuelTankType, FuelTankVanillaType } from './FuelTank';
import { GroupType } from './Group';

export const Icon = QuestionMarkIcon;

export const vanillaData = {
  n: 'Root' as 'Root',
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

export const DATA = {
  ...vanillaData,

  meta: {
    label: 'Unknown Part',
    visible: true,
    locked: false,
  },

  relations: {} as RootBlueprint.PartPointer,
};

export type RootType = typeof DATA;

export type AnyVanillaPartType = FuelTankVanillaType;
export type AnyPartType = RootType | FuelTankType | GroupType;
export type AnySavedPartType = AnyPartType & { relations: never };

export type AnyVanillaPartName = 'Fuel Tank';
export type AnyPartName = 'Root' | 'Fuel Tank' | 'Group';

export type AnyPartialPartType = DeepPartial<AnyPartType>;
export type AnyPartialVanillaPartType = DeepPartial<AnyVanillaPartType>;

export type PartModule = {
  VANILLA_DATA?: AnyVanillaPartType | undefined;
  DATA: AnyPartType;

  Icon: FC<any>;

  LayoutComponent: FC<any>;
};

const LayoutComponent: FC = () => <mesh />;

const Root: PartModule = {
  DATA,

  Icon,

  LayoutComponent,
};
export default Root;
