import FuelTank, { FuelTankData } from 'classes/Blueprint/parts/FuelTank';
import Group, { GroupData } from 'classes/Blueprint/parts/Group';
import { FC } from 'react';
import { Box2 } from 'three';
import { Blueprint } from './Blueprint';
import DeepPartial from './DeepPartial';

export type UUID = string;

export type PartID = UUID;
export type PartIDs = PartID[];

export type AnyPart = FuelTank | Group;
export type AnyPartClass = typeof FuelTank | typeof Group;
export type AnySavedPart = FuelTankData | GroupData;
export type AnyVanillaPart = FuelTankData;

export type AnyPartName = 'Fuel Tank' | 'Group';

export type AnyPartialPartType = DeepPartial<AnyPart>;

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
