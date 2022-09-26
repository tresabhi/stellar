import { Blueprint } from 'game/Blueprint';
import { EngineFrontierRegistry } from 'game/parts/EngineFrontier';
import { EngineKolibriRegistry } from 'game/parts/EngineKolibri';
import { EnginePeregrineRegistry } from 'game/parts/EnginePeregrine';
import { EngineTitanRegistry } from 'game/parts/EngineTitan';
import { EngineValiantRegistry } from 'game/parts/EngineValiant';
import { FuelTankRegistry } from 'game/parts/FuelTank';
import { GroupRegistry } from 'game/parts/Group';
import { Part, VanillaPart } from 'game/parts/Part';
import { FC } from 'react';
import { PartComponentProps, PartPropertyComponentProps } from 'types/Parts';
import create from 'zustand';
import PartCategory from '../hooks/constants/partCategory';

export type PartExportifier<Type extends Part> = (
  part: Type,
  context: Blueprint,
) => VanillaPart | VanillaPart[] | null;

export interface PartRegistryItem<Type extends Part> {
  category: PartCategory;

  // null if it has a custom exportifier or cannot export at all
  vanillaData: VanillaPart | null;
  data: Part;

  Icon: FC;
  PropertyEditor?: FC<PartPropertyComponentProps>;
  Mesh: FC<PartComponentProps>;

  exportify?: PartExportifier<Type>;

  preload?: string | string[];
}

export type UsePartRegistry = Map<string, PartRegistryItem<Part>>;
export type PartRegistryFragment<Type extends Part> = [
  string,
  PartRegistryItem<Type>,
];

export const UsePartRegistryData = new Map([
  FuelTankRegistry,
  GroupRegistry,
  EngineKolibriRegistry,
  EngineValiantRegistry,
  EngineFrontierRegistry,
  EnginePeregrineRegistry,
  EngineTitanRegistry,
] as PartRegistryFragment<Part>[]);

const usePartRegistry = create(() => UsePartRegistryData);
export default usePartRegistry;
