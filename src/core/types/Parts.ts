import { FuelTankData } from 'parts/FuelTank';
import { GroupData } from 'parts/Group';
import { FC } from 'react';
import DeepPartial from './DeepPartial';

export type AnyPart = GroupData | FuelTankData;
export type AnyVanillaPart = AnyPart & { meta: never };

export type AnyVanillaPartName = 'Fuel Tank';
export type AnyPartName = 'Group' | 'Fuel Tank';

export type AnyPartialPartType = DeepPartial<AnyPart>;
export type AnyPartialVanillaPartType = DeepPartial<AnyVanillaPart>;

export interface PartModule {
  VANILLA_DATA?: AnyVanillaPart;
  DATA: AnyPart;

  Icon: FC<any>;
  LayoutComponent: FC<any>;

  isExportable: boolean;
}

const lol: AnyPart = {
  n: '',
};

export interface PartMeta {
  label: string;
  visible: boolean;
  locked: boolean;

  ID: string;
  parentID: string;
}

const lol: AnyVanillaPart = {};
