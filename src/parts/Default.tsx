import { RefObject } from 'react';
import { PartAddress } from 'types/Blueprint';
import { NIL } from 'uuid';

export interface PartWithMeta {
  meta: {
    parentAddress?: PartAddress;

    label: string;
    visible: boolean;
    locked: boolean;

    // all optional as they will be added later in the lifecycle
    listing?: RefObject<HTMLDivElement>;
  };
}

export interface DefaultPart extends PartWithMeta {
  // `n` is not provided to avoid type overwrites
  p: { x: number; y: number };
  o: { x: number; y: number; z: number };
  t: '-Infinity';
}

export const DefaultPartData: DefaultPart = {
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
