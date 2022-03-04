import { AnyPart, AnyVanillaPart, PartID, PartIDs } from 'types/Parts';

export interface VanillaBlueprint {
  center: number;
  offset: { x: number; y: number };
  parts: AnyVanillaPart[];
  stages: { partIndexes: number[] }[]; // TODO: isolate this type
}

export interface Blueprint extends Omit<VanillaBlueprint, 'parts'> {
  meta: {
    format_version: number;
  };
  selections: {
    last?: PartID;
    current: PartIDs;
  };
  parts: AnyPartMap;
  partOrder: PartIDs;
}

export interface SavifiedBlueprint extends Omit<Blueprint, 'parts'> {
  parts: SavifiedPartMap;
}

export type AnyPartMap = Map<PartID, AnyPart>;
export type SavifiedPartMap = [PartID, AnyPart][];
