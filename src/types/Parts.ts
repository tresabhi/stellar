import { FuelTank, VanillaFuelTank } from 'parts/FuelTank';
import { Group } from 'parts/Group';
import { FC } from 'react';
import { Box2 } from 'three';
import { Blueprint } from './Blueprint';
import DeepPartial from './DeepPartial';

export type UUID = string;

export type PartID = UUID;
export type PartIDs = PartID[];

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

export type BoundingBoxComputer = (state: any, blueprint: Blueprint) => Box2;

export type PartModule = {
  // meta
  isExportable?: boolean;
  hasTransformations?: boolean;

  // reactive meta
  getBoundingBox: BoundingBoxComputer;

  // UI
  Icon: FC<any>;
  PropertyComponent?: FC<PropertyComponentProps>;

  // render
  LayoutComponent: FC<ReactivePartComponentProps>;

  // miscellaneous
  data: AnyPart;
};
