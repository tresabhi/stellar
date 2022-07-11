import { Blueprint } from 'game/Blueprint';
import { EngineFrontierRegistry } from 'game/parts/EngineFrontier';
import { EngineKolibriRegistry } from 'game/parts/EngineKolibri';
import { EnginePeregrineRegistry } from 'game/parts/EnginePeregrine';
import { EngineValiantRegistry } from 'game/parts/EngineValiant';
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

  Icon: FC;
  PropertyEditor?: FC<PartPropertyComponentProps>;
  Mesh: FC<PartComponentProps>;

  exportify?: PartExportifier<any>;
}

export type UsePartRegistry = Map<string, PartRegistryItem>;
export type PartRegistryFragment = [string, PartRegistryItem];

export const UsePartRegistryData = new Map<string, PartRegistryItem>([
  FuelTankRegistry,
  GroupRegistry,
  EngineKolibriRegistry,
  EngineValiantRegistry,
  EngineFrontierRegistry,
  EnginePeregrineRegistry,
]);

const usePartRegistry = create(() => UsePartRegistryData);
export default usePartRegistry;
