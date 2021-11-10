import { type as rootPartType } from 'core/hooks/useBlueprint/parts/Root';

const typedParts: Array<rootPartType> = [];
const typedStages: Array<number> = [];
export const vanillaData = {
  center: 0,
  offset: {
    x: 0,
    y: 0,
  },
  parts: typedParts,
  stages: typedStages,
};

export const data = {
  ...vanillaData,

  '.stellar': {
    format_version: 1,
  },
};

export type type = typeof data;

export type vanillaType = typeof vanillaData;
