import { AnyPart, AnyPartMap, AnyVanillaPart, UUID } from 'types/Parts';

export interface PrimitiveBox2 {
  min: { x: number; y: number };
  max: { x: number; y: number };
}

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
  boundingBoxes: { [key: UUID]: PrimitiveBox2 };
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
  boundingBoxes: {},
};

export const SavedBlueprintData: SavedBlueprint = {
  ...BlueprintData,
  parts: [],
};
