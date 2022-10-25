import { Blueprint } from 'game/Blueprint';
import { Part, VanillaPart } from 'game/parts/Part';
import PartCategory from 'hooks/constants/partCategory';
import { FC } from 'react';
import { PartComponentProps, PartPropertyComponentProps } from 'types/Parts';
import create from 'zustand';

export type PartRegistryItem<Type extends Part> = {
  category: PartCategory;
  vanillaData: VanillaPart | null;
  data: Part;

  Icon: FC;
  PropertyEditor?: FC<PartPropertyComponentProps>;
  Mesh: FC<PartComponentProps>;

  exportify?: PartExportifier<Type>;
};

export type PartExportifier<Type extends Part> = (
  part: Type,
  context: Blueprint,
) => VanillaPart | VanillaPart[] | null;

export type UsePartRegistry = Map<string, PartRegistryItem<Part>>;

const partsGlob = {
  ...import.meta.glob('../game/parts/*', { eager: true, import: 'registry' }),
  ...import.meta.glob('../game/parts/*/index.tsx', {
    eager: true,
    import: 'registry',
  }),
};

const UsePartRegistryData: [string, PartRegistryItem<Part>][] = [];

Object.keys(partsGlob).forEach((path) => {
  const partRegistry = partsGlob[path] as PartRegistryItem<Part> | null;
  if (partRegistry) {
    UsePartRegistryData.push([partRegistry.data.n, partRegistry]);
  }
});

const usePartRegistry = create(() => new Map(UsePartRegistryData));
export default usePartRegistry;
