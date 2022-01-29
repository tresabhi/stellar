/*
export const vanillaData = {
  center: 0,
  offset: {
    x: 0,
    y: 0,
  },
  parts: [] as AnyVanillaPart[],
  stages: [] as { partIndexes: number[] }[],
};

export const data = {
  ...vanillaData,

  '.stellar': {
    format_version: 1,
  },
  parts: [] as AnyPart[],
};

export type Type = typeof data;
export type VanillaType = typeof vanillaData;

export type PartAddress = number[];
export type PartAddresses = PartAddress[];

export type PartPointer = {
  // if undefined, the part is in the root
  parent?: GroupData;
  self: AnyPart;

  listing: RefObject<HTMLDivElement>;
  layoutModel: RefObject<GroupProps | MeshProps>; // TODO: fix ref object type
};
export type PartPointers = PartPointer[];

export type SelectionType = 'single' | 'multi' | 'list' | 'multi_list';
export type EfficientSelectionType = [
  number,
  boolean | EfficientSelectionType,
][];
*/

import { AnyPart, AnyVanillaPart } from 'core/types/Parts';

export interface VanillaBlueprint {
  center: number;
  offset: { x: number; y: number };
  parts: AnyVanillaPart[];
  stages: { partIndexes: number[] }[]; // TODO: isolate this type
}

export interface Blueprint {
  meta: {
    format_version: number;
  };

  center: number;
  offset: { x: number; y: number };
  parts: AnyPart[];
  stages: { partIndexes: number[] }[]; // TODO: isolate this type too
}

export type PartAddress = number[];
