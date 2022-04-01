import { VanillaPart } from 'classes/Parts/Part';
import { AnyPart, AnySavedPart } from 'interfaces/part';
import { UUID } from './Parts';

export interface VanillaBlueprint {
  center: number;
  offset: { x: number; y: number };
  parts: VanillaPart[];
  stages: { partIndexes: number[] }[]; // TODO: isolate this type
}

export interface LiveBlueprint extends Omit<VanillaBlueprint, 'parts'> {
  format_version: number;
  selections: UUID[];
  parts: AnyPartMap;
  partOrder: UUID[];
}

export interface SavedBlueprint extends Omit<LiveBlueprint, 'parts'> {
  parts: SavifiedPartMap;
}

export type AnyPartMap = Map<UUID, AnyPart>;
export type SavifiedPartMap = [UUID, AnySavedPart][];
