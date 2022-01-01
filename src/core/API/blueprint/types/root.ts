import * as RootPart from 'core/API/part/types/root';

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

export type anyPartTypeArray = Array<RootPart.anyPartType>;
export type anyVanillaPartTypeArray = RootPart.anyVanillaPartType[];

export type partAddress = number[];
export type partAddresses = partAddress[];

/**
 * @deprecated
 * TODO: switch to `efficientSelectionType`.
 */
export type selectionType = 'single' | 'multi' | 'list' | 'multi_list';
export type efficientSelectionType = [
  number,
  boolean | efficientSelectionType,
][];
