import * as Root from 'core/APIs/parts/root';

const vanillaTypedParts: Array<Root.anyVanillaPartType> = [];
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
type partsType = Array<Root.anyPartType | partsType>;

const typedParts: partsType = [];
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

const lol: type = {
  '.stellar': { format_version: 1 },
  center: 0,
  offset: { x: 0, y: 0 },
  stages: [],

  parts: [
    {
      n: 'Fuel Tank',
      '.stellar': {
        label: 'lol',
        locked: false,
        visible: true,
      },
      N: {
        fuel_percent: 1,
        height: 2,
        width_a: 1,
        width_b: 1,
        width_original: 1,
      },
      T: {
        color_tex: '_',
        shape_tex: 'Edges Smooth',
      },
      o: {
        x: 1,
        y: 1,
        z: 0,
      },
      p: {
        x: 0,
        y: 0,
      },
      t: '-',
    },
    [],
  ],
};
