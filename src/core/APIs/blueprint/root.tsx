import * as RootPart from 'core/APIs/parts/root';
import * as GroupPart from 'core/APIs/parts/group';

const vanillaTypedParts: Array<RootPart.anyVanillaPartType> = [];
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

// I had to declare a type to make it recursive
export type partArrayType = Array<RootPart.anyPartType | GroupPart.type>;

const typedParts: partArrayType = [];
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
