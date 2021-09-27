import '@react-three/fiber';

export interface Type {
  n: string;
  p: {
    x: number;
    y: number;
  };
  o: {
    x: number;
    y: number;
    z: number;
  };
  t: string;
}

export const Part = () => {
  return <mesh />;
};
