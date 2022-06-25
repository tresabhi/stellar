import { Blueprint } from 'game/Blueprint';
import {
  EngineKolibriData,
  EngineKolibriIcon,
  EngineKolibriLayoutComponent,
  VanillaEngineKolibriData,
} from 'game/parts/EngineKolibri';
import {
  FuelTankData,
  FuelTankIcon,
  FuelTankLayoutComponent,
  FuelTankPropertyComponent,
  VanillaFuelTankData,
} from 'game/parts/FuelTank';
import {
  GroupData,
  groupExportify,
  GroupIcon,
  GroupLayoutComponent,
} from 'game/parts/Group';
import { Part, VanillaPart } from 'game/parts/Part';
import { FC } from 'react';
import {
  AnyPart,
  AnyVanillaPart,
  PartComponentProps,
  PartPropertyComponentProps,
} from 'types/Parts';
import create from 'zustand';

export type PartExportifier<Type extends Part> = (
  part: Type,
  context: Blueprint,
) => AnyVanillaPart | AnyVanillaPart[] | null;

export interface PartRegistryItem {
  // null if it has a custom exportifier or cannot export at all
  vanillaData: VanillaPart | null;
  data: AnyPart;

  iconComponent: FC;
  propertyComponent?: FC<PartPropertyComponentProps>;
  layoutComponent: FC<PartComponentProps>;

  exportify?: PartExportifier<any>;
}

export type UsePartRegistry = Map<string, PartRegistryItem>;

export const UsePartRegistryData: UsePartRegistry = new Map([
  [
    'Fuel Tank',
    {
      vanillaData: VanillaFuelTankData,
      data: FuelTankData,

      iconComponent: FuelTankIcon,
      propertyComponent: FuelTankPropertyComponent,
      layoutComponent: FuelTankLayoutComponent,
    },
  ],
  [
    'Group',
    {
      vanillaData: null,
      data: GroupData,

      iconComponent: GroupIcon,
      layoutComponent: GroupLayoutComponent,

      exportify: groupExportify,
    },
  ],
  [
    'Engine_Kolibri',
    {
      vanillaData: VanillaEngineKolibriData,
      data: EngineKolibriData,

      iconComponent: EngineKolibriIcon,
      layoutComponent: EngineKolibriLayoutComponent,
    },
  ],
]);

// TODO: change all stores to start with "use"
const usePartRegistry = create(() => UsePartRegistryData);
export default usePartRegistry;
