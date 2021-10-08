import { dataType as rootPartType } from '../parts/Root';

const typedParts: Array<rootPartType> = [];
const typedStages: Array<number> = [];
export const defaultData = {
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

export type dataType = typeof defaultData;
