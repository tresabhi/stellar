import { AnyPart, AnyPartMap, AnyVanillaPart, UUID } from 'types/Parts';

export interface VanillaBlueprint {
  center: number;
  offset: { x: number; y: number };
  parts: AnyVanillaPart[];
  stages: { partIndexes: number[] }[]; // TODO: isolate this type
}

export interface Blueprint extends Omit<VanillaBlueprint, 'parts'> {
  readonly format_version: number;

  selections: UUID[];
  parts: AnyPartMap;
  partOrder: UUID[];
}

export interface SavedBlueprint extends Omit<Blueprint, 'parts'> {
  parts: [string, AnyPart][];
}

export const VanillaBlueprintData: VanillaBlueprint = {
  center: 0,
  offset: { x: 0, y: 0 },
  parts: [],
  stages: [],
};

export const BlueprintData: Blueprint = {
  ...VanillaBlueprintData,

  format_version: 5,

  selections: [],
  parts: new Map(),
  partOrder: [],
};

export const SavedBlueprintData: SavedBlueprint = {
  ...BlueprintData,
  parts: [],
};
