import { PartMap } from 'types/Parts';
import { Part, VanillaPart } from './parts/Part';

export interface VanillaStage {
  partIndexes: number[];
}

export interface VanillaBlueprint {
  center: number;
  offset: { x: number; y: number };
  parts: VanillaPart[];
  stages: VanillaStage[];
}

export interface Blueprint extends Omit<VanillaBlueprint, 'parts'> {
  readonly format_version: number;

  selections: string[];
  parts: PartMap;
  part_order: string[];
}

export interface SavedBlueprint extends Omit<Blueprint, 'parts'> {
  parts: [string, Part][];
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
  part_order: [],
};

export const SavedBlueprintData: SavedBlueprint = {
  ...BlueprintData,
  parts: [],
};
