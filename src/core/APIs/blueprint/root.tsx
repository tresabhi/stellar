import * as RootPart from 'core/APIs/parts/root';

const vanillaTypedParts: anyVanillaPartTypeArray = [];
const vanillaTypedStages: Array<number> = [];
export const vanillaData = {
  center: 0,
  offset: {
    x: 0,
    y: 0,
  },
  parts: vanillaTypedParts,
  stages: vanillaTypedStages,
};

const typedParts: anyPartTypeArray = [];
const typedStages: Array<number> = [];
export const data = {
  ...vanillaData,

  '.stellar': {
    format_version: 1,
  },

  parts: typedParts,
  stages: typedStages,
};

export type type = typeof data;

export type vanillaType = typeof vanillaData;

export interface anyPartTypeArray extends Array<RootPart.anyPartType> {}

export type anyVanillaPartTypeArray = Array<RootPart.anyVanillaPartType>;
