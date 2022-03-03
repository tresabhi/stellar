import { FuelTank, VanillaFuelTank } from 'parts/FuelTank';
import { Group } from 'parts/Group';
import { FC } from 'react';
import DeepPartial from './DeepPartial';

export type UUID = string;

// BIG TODO: Add vanilla part types
export type AnyPart = FuelTank | Group;
export type AnyVanillaPart = VanillaFuelTank;

export type AnyPartName = AnyVanillaPartName | 'Group';
export type AnyVanillaPartName = 'Fuel Tank';

export type AnyPartialPartType = DeepPartial<AnyPart>;
export type AnyPartialVanillaPartType = DeepPartial<AnyVanillaPart>;

export interface PartComponentProps {
  part: AnyPart;
}
export interface PropertyComponentProps {
  IDs: UUID[];
}
export interface ReactivePartComponentProps {
  ID: UUID;
}

export type PartModule = {
  // meta
  isExportable?: boolean;
  hasTransformations?: boolean;

  // UI
  Icon: FC<any>;
  PropertyComponent?: FC<PropertyComponentProps>;

  // render
  LayoutComponent: FC<ReactivePartComponentProps>;

  // miscellaneous
  data: AnyPart;
};
