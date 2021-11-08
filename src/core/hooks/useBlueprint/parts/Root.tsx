import '@react-three/fiber';
import { memo } from 'react';

export const data = {
  '.stellar': {
    label: 'Root Part',
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

export type type = typeof data & { n: 'Root' };

export const Component = memo(() => <mesh />);
