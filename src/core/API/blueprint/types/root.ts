import * as RootBlueprint from 'core/API/blueprint/types/root';
import * as GroupPart from 'core/API/part/types/group';
import * as RootPart from 'core/API/part/types/root';
import { RefObject } from 'react';

export const vanillaData = {
  center: 0,
  offset: {
    x: 0,
    y: 0,
  },
  parts: [] as AnyVanillaPartTypeArray,
  stages: [] as { partIndexes: number[] }[],
};

export const data = {
  ...vanillaData,

  '.stellar': {
    format_version: 1,
  },
  parts: [] as AnyPartTypeArray,
};

export type Type = typeof data;
export type VanillaType = typeof vanillaData;

export type AnyPartTypeArray = Array<RootPart.AnyPartType>;
export type AnyVanillaPartTypeArray = RootPart.AnyVanillaPartType[];

export type PartAddress = number[];
export type PartAddresses = PartAddress[];

export type PartPointer = {
  parentPointer: RootBlueprint.Type | GroupPart.Type;
  childPointer: RootPart.AnyPartType;

  listingRef: RefObject<HTMLDivElement>;
};
export type PartPointers = PartPointer[];

export type SelectionType = 'single' | 'multi' | 'list' | 'multi_list';
export type EfficientSelectionType = [
  number,
  boolean | EfficientSelectionType,
][];
