import { Blueprint } from 'game/Blueprint';
import { EngineKolibriRegistry } from 'game/parts/EngineKolibri';
import { FuelTankRegistry } from 'game/parts/FuelTank';
import { GroupRegistry } from 'game/parts/Group';
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
export type PartRegistryFragment = [string, PartRegistryItem];

export const UsePartRegistryData = new Map<string, PartRegistryItem>([
  FuelTankRegistry,
  GroupRegistry,
  EngineKolibriRegistry,
]);

const usePartRegistry = create(() => UsePartRegistryData);
export default usePartRegistry;
