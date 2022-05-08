import { Blueprint } from 'game/Blueprint';
import {
  FuelTankBoundingBoxComputer,
  FuelTankData,
  FuelTankIcon,
  FuelTankLayoutComponent,
  FuelTankPropertyComponent,
  VanillaFuelTankData
} from 'game/parts/FuelTank';
import { Part, VanillaPart } from 'game/parts/Part';
import { FC } from 'react';
import {
  AnyPart,
  AnyVanillaPart,
  PartComponentProps,
  PartPropertyComponentProps
} from 'types/Parts';
import create from 'zustand';
import { BoundingBox } from './boundingBoxesCache';

export type BoundingBoxComputer<Type extends Part> = (
  part: Type,
) => BoundingBox;

export interface PartRegistryItem {
  // null if it has a custom exportifier or cannot export at all
  vanillaData: VanillaPart | null;
  data: Part;

  iconComponent: FC;
  propertyComponent?: FC<PartPropertyComponentProps>;
  layoutComponent: FC<PartComponentProps>;

  computeBoundingBox: BoundingBoxComputer<any>;
  exportify?: (
    part: AnyPart,
    context: Blueprint,
  ) => AnyVanillaPart | AnyVanillaPart[] | null;
}

export type PartRegistryStore = Map<string, PartRegistryItem>;

const defaultState:PartRegistryStore = new Map([
  [
    'Fuel Tank',
    {
      vanillaData: VanillaFuelTankData,
      data: FuelTankData,

      iconComponent: FuelTankIcon,
      propertyComponent: FuelTankPropertyComponent,
      layoutComponent: FuelTankLayoutComponent,

      computeBoundingBox: FuelTankBoundingBoxComputer,
    },
  ],
]);

// TODO: change all stores to start with "use"
const partRegistryStore = create(() => defaultState);
export default partRegistryStore;
