import * as RootPart from 'core/APIs/parts/root';

export const vanillaData = {
  center: 0,
  offset: {
    x: 0,
    y: 0,
  },
  parts: [] as anyVanillaPartTypeArray,
  stages: [] as Array<{ partIndexes: Array<number> }>,
};

export const data = {
  ...vanillaData,

  '.stellar': {
    format_version: 1,
  },
  parts: [] as anyPartTypeArray,
  stages: [] as Array<{ partIndexes: Array<number> }>,
};

export type type = typeof data;
export type vanillaType = typeof vanillaData;

export interface anyPartTypeArray extends Array<RootPart.anyPartType> {}
export type anyVanillaPartTypeArray = Array<RootPart.anyVanillaPartType>;

export type partAddress = Array<number>;
export type partAddresses = Array<partAddress>;

export type selectionType = 'single' | 'multi' | 'list' | 'multi_list';
