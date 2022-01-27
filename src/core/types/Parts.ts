import { FuelTankType, FuelTankVanillaType } from 'parts/FuelTank';
import { GroupType } from 'parts/Group';
import { RootType, RootVanillaType } from 'parts/Root';
import { FC } from 'react';
import DeepPartial from './DeepPartial';

export type AnyVanillaPartType = RootVanillaType | FuelTankVanillaType;
export type AnyPartType = RootType | GroupType | FuelTankType;

export type AnyVanillaPartName = 'Fuel Tank';
export type AnyPartName = 'Root' | 'Group' | 'Fuel Tank';

export type AnyPartialPartType = DeepPartial<AnyPartType>;
export type AnyPartialVanillaPartType = DeepPartial<AnyVanillaPartType>;

export interface PartModule {
  VANILLA_DATA?: AnyVanillaPartType;
  DATA: AnyPartType;

  Icon: FC<any>;
  LayoutComponent: FC<any>;

  isExportable: boolean;
}
