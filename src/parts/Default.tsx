import { NIL } from 'uuid';

export type DefaultPartData = {
  meta: {
    ID: string;
    parentID: string;

    label: string;
    visible: boolean;
    locked: boolean;
  };

  p: { x: number; y: number };
  o: { x: number; y: number; z: number };
  t: '-Infinity';
};

export const DefaultPartData: DefaultPartData = {
  meta: {
    ID: NIL,
    parentID: NIL,

    label: 'Unknown Part',
    visible: true,
    locked: true,
  },

  p: { x: 0, y: 0 },
  o: { x: 1, y: 1, z: 0 },
  t: '-Infinity',
};
