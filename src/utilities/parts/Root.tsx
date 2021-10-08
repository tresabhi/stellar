import '@react-three/fiber';

export class defaultData {
  '.stellar' = {
    label: 'Internally Unlabeled Part',
    visible: true,
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

export type dataType = InstanceType<typeof defaultData>;

export const HighPoly = () => {
  return <mesh />;
};

export const LowPoly = () => {
  return <mesh />;
};
