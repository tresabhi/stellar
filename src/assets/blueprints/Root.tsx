import * as Root from 'core/hooks/useBlueprint/parts/Root';

const vanillaTypedParts: Array<Root.allVanillaPartTypes> = [];
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

const typedParts: Array<Root.allPartTypes> = [];
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
