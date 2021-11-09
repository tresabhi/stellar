import { type as rootPartType } from 'core/hooks/useBlueprint/parts/Root';

const typedParts: Array<rootPartType> = [];
const typedStages: Array<number> = [];
export const data = {
  '.stellar': {
    format_version: 1,
  },
  center: 0,
  offset: {
    x: 0,
    y: 0,
  },
  parts: typedParts,
  stages: typedStages,
};

export type type = typeof data;
