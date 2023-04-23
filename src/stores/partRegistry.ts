import { Blueprint } from 'game/Blueprint';
import { Part, VanillaPart } from 'game/parts/Part';
import PartCategory from 'hooks/constants/partCategory';
import { FC } from 'react';
import { PartComponentProps } from 'types/Parts';
import { create } from 'zustand';

export type PartRegistryItem<Type extends Part> = {
  category: PartCategory;
  vanillaData: VanillaPart | null;
  data: Part;
  label: string;

  Icon: FC;
  LayoutComponent: FC<PartComponentProps>;

  exportify?: PartExportifier<Type>;
};

export type PartExportifier<Type extends Part> = (
  part: Type,
  context: Blueprint,
) => [VanillaPart[], Part[]];

export type UsePartRegistry = Map<string, PartRegistryItem<Part>>;

const partsGlob = {
  ...import.meta.glob('../game/parts/*/index.tsx', {
    eager: true,
    import: 'default',
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
