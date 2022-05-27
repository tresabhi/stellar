import { AnyPart, AnyPartMap, AnyVanillaPart } from 'types/Parts';

export interface PrimitiveBox2 {
  min: { x: number; y: number };
  max: { x: number; y: number };
}

export type BoundingBoxMap = Map<string, PrimitiveBox2>;

export interface VanillaBlueprint {
  center: number;
  offset: { x: number; y: number };
  parts: AnyVanillaPart[];
  stages: { partIndexes: number[] }[]; // TODO: isolate this type
}

export interface Blueprint extends Omit<VanillaBlueprint, 'parts'> {
  readonly format_version: number;

  selections: string[];
  parts: AnyPartMap;
  partOrder: string[];
  boundingBoxes: BoundingBoxMap;
}

export interface SavedBlueprint
  extends Omit<Omit<Blueprint, 'parts'>, 'boundingBoxes'> {
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
  boundingBoxes: new Map(),
};

export const SavedBlueprintData: SavedBlueprint = {
  ...BlueprintData,
  parts: [],
};
