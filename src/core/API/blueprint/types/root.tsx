import * as RootPart from 'core/API/part/types/root';
import { TupleType } from 'typescript';

export const vanillaData = {
  center: 0,
  offset: {
    x: 0,
    y: 0,
  },
  parts: [] as anyVanillaPartTypeArray,
  stages: [] as { partIndexes: number[] }[],
};

export const data = {
  ...vanillaData,

  '.stellar': {
    format_version: 1,
  },
  parts: [] as anyPartTypeArray,
};

export type type = typeof data;
export type vanillaType = typeof vanillaData;

export interface anyPartTypeArray extends Array<RootPart.anyPartType> {}
export type anyVanillaPartTypeArray = RootPart.anyVanillaPartType[];

export type partAddress = number[];
export type partAddresses = partAddress[];

export type lol = [number, true | lol][];
const asd: lol = [
  [0, true],
  [
    1,
    [
      [0, true],
      [1, true],
      [2, true],
    ],
  ],
];

export type selectionType = 'single' | 'multi' | 'list' | 'multi_list';
