import '@react-three/fiber';

export class Data {
  '.stellar' = {
    label: 'Unlabeled Part',
    visibe: true,
    locked: false,
  };
  n = 'Root';
  p = {
    x: 0,
    y: 0,
  };
  o = {
    x: 1,
    y: 1,
    z: 0,
  };
  t = '-Infinity';
}

export type Type = InstanceType<typeof Data>;

export const HighPoly = () => {
  return <mesh />;
};

export const LowPoly = () => {
  return <mesh />;
};
