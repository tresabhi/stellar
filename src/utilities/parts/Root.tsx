import '@react-three/fiber';
import { FC } from 'react';
import { Type } from 'typescript';

export const data = {
  '.stellar': {
    label: 'Internally Unlabeled Part',
    visible: true,
    locked: false,
  },
  n: 'Root',
  p: {
    x: 0,
    y: 0,
  },
  o: {
    x: 1,
    y: 1,
    z: 0,
  },
  t: '-Infinity',
};

export type minimalType = { n: string };

export type type = typeof data;

export type partFile = {
  data: type;
  type: Type;
  Component: FC;
};

export type partComponentProps = {
  data: type;
  offset: { x: number; y: number };
};

export const Component = () => <mesh />;
