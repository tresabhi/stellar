import '@react-three/fiber';

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

export type type = typeof data;

export const HighPoly = () => <mesh />;

export const LowPoly = () => <mesh />;
