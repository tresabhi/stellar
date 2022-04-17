import { SavedBlueprint } from 'game/Blueprint';

const color = 'Color_White';
const shape = 'Strut';
const scale = [1, 1];

const blueprint: SavedBlueprint = {
  format_version: 1,
  selections: [],
  center: 0,
  offset: {
    x: 0,
    y: 0,
  },
  parts: [
    [
      'a',
      {
        label: 'box',
        ID: 'a',
        hidden: false,
        selected: false,
        locked: false,
        n: 'Fuel Tank',
        p: {
          x: 1,
          y: 0,
        },
        o: {
          x: scale[0],
          y: scale[1],
          z: 0,
        },
        t: '-Infinity',
        N: {
          width_original: 2,
          width_a: 2,
          width_b: 2,
          height: 2,
          fuel_percent: 1,
        },
        T: {
          color_tex: color,
          shape_tex: shape,
        },
      },
    ],
    [
      'b',
      {
        ID: 'b',
        hidden: false,
        selected: false,
        locked: false,
        label: 'tall',
        n: 'Fuel Tank',
        p: {
          x: 4,
          y: 0,
        },
        o: {
          x: scale[0],
          y: scale[1],
          z: 0,
        },
        t: '-Infinity',
        N: {
          width_original: 2,
          width_a: 2,
          width_b: 2,
          height: 4,
          fuel_percent: 1,
        },
        T: {
          color_tex: color,
          shape_tex: shape,
        },
      },
    ],
    [
      'c',
      {
        ID: 'c',
        hidden: false,
        selected: false,
        locked: false,
        label: 'wide',
        n: 'Fuel Tank',
        p: {
          x: 0,
          y: 3,
        },
        o: {
          x: scale[0],
          y: scale[1],
          z: 0,
        },
        t: '-Infinity',
        N: {
          width_original: 4,
          width_a: 4,
          width_b: 4,
          height: 1,
          fuel_percent: 1,
        },
        T: {
          color_tex: color,
          shape_tex: shape,
        },
      },
    ],
    [
      'd',
      {
        ID: 'd',
        hidden: false,
        selected: false,
        locked: false,
        label: 'upright cone',
        n: 'Fuel Tank',
        p: {
          x: -3,
          y: 0,
        },
        o: {
          x: scale[0],
          y: scale[1],
          z: 0,
        },
        t: '-Infinity',
        N: {
          width_original: 4,
          width_a: 4,
          width_b: 2,
          height: 2,
          fuel_percent: 1,
        },
        T: {
          color_tex: color,
          shape_tex: shape,
        },
      },
    ],
    [
      'e',
      {
        ID: 'e',
        hidden: false,
        selected: false,
        locked: false,
        label: 'upside down cone',
        n: 'Fuel Tank',
        p: {
          x: 0,
          y: -3,
        },
        o: {
          x: scale[0],
          y: scale[1],
          z: 0,
        },
        t: '-Infinity',
        N: {
          width_original: 4,
          width_a: 1,
          width_b: 4,
          height: 2,
          fuel_percent: 1,
        },
        T: {
          color_tex: color,
          shape_tex: shape,
        },
      },
    ],
    [
      'f',
      {
        ID: 'f',
        hidden: false,
        selected: false,
        locked: false,
        label: 'titled box',
        n: 'Fuel Tank',
        p: {
          x: 4,
          y: -3,
        },
        o: {
          x: scale[0],
          y: scale[1],
          z: 45,
        },
        t: '-Infinity',
        N: {
          width_original: 2,
          width_a: 2,
          width_b: 2,
          height: 2,
          fuel_percent: 1,
        },
        T: {
          color_tex: color,
          shape_tex: shape,
        },
      },
    ],
    [
      'g',
      {
        ID: 'g',
        hidden: false,
        selected: false,
        locked: false,
        label: '0 width tall',
        n: 'Fuel Tank',
        p: {
          x: -3.5,
          y: -3,
        },
        o: {
          x: 0,
          y: 0,
          z: 0,
        },
        t: '-Infinity',
        N: {
          width_original: 1,
          width_a: 1,
          width_b: 1,
          height: 2,
          fuel_percent: 1,
        },
        T: {
          color_tex: color,
          shape_tex: shape,
        },
      },
    ],
    [
      'h',
      {
        ID: 'h',
        hidden: false,
        selected: false,
        locked: false,
        label: '0 width skinny',
        n: 'Fuel Tank',
        p: {
          x: -5.5,
          y: -3,
        },
        o: {
          x: 0,
          y: 0,
          z: 0,
        },
        t: '-Infinity',
        N: {
          width_original: 0.5,
          width_a: 0.5,
          width_b: 0.5,
          height: 2,
          fuel_percent: 1,
        },
        T: {
          color_tex: color,
          shape_tex: shape,
        },
      },
    ],
    [
      'i',
      {
        ID: 'i',
        hidden: false,
        selected: false,
        locked: false,
        label: '0 width even skinnier',
        n: 'Fuel Tank',
        p: {
          x: -6,
          y: 0,
        },
        o: {
          x: 0,
          y: 0,
          z: 0,
        },
        t: '-Infinity',
        N: {
          width_original: 0.2,
          width_a: 0.2,
          width_b: 0.2,
          height: 2,
          fuel_percent: 1,
        },
        T: {
          color_tex: color,
          shape_tex: shape,
        },
      },
    ],
    [
      'j',
      {
        ID: 'j',
        hidden: false,
        selected: false,
        locked: false,
        label: '0 width omega skinnier',
        n: 'Fuel Tank',
        p: {
          x: -5,
          y: 2,
        },
        o: {
          x: 0,
          y: 0,
          z: 0,
        },
        t: '-Infinity',
        N: {
          width_original: 0.1,
          width_a: 0.1,
          width_b: 0.1,
          height: 2,
          fuel_percent: 1,
        },
        T: {
          color_tex: color,
          shape_tex: shape,
        },
      },
    ],
    [
      'k',
      {
        ID: 'k',
        hidden: false,
        selected: false,
        locked: false,
        label: 'both 0 widths',
        n: 'Fuel Tank',
        p: {
          x: -3,
          y: 3,
        },
        o: {
          x: 0,
          y: 0,
          z: 0,
        },
        t: '-Infinity',
        N: {
          width_original: 0,
          width_a: 0,
          width_b: 0,
          height: 2,
          fuel_percent: 1,
        },
        T: {
          color_tex: color,
          shape_tex: shape,
        },
      },
    ],
    [
      '1',
      {
        label: 'Group',
        ID: '1',
        hidden: false,
        selected: false,
        locked: false,
        n: 'Group',
        partOrder: ['a', 'b'],
        expanded: true,
      },
    ],
  ],
  partOrder: ['1', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'],
  stages: [],
};

export default blueprint;
