import { FC } from 'react';
import Root from './Root';
import '@react-three/fiber';

export interface Type extends Root {
  N: {
    width_original: number;
    width_a: number;
    width_b: number;
    height: number;
    fuel_percent: number;
  };
  T: {
    color_tex: string;
    shape_tex: string;
  };
}

// ONLY FOR DEBUGGING PURPOSES
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

interface IPart {
  data: Type;
}
export const Part: FC<IPart> = ({ data }) => {
  return (
    <mesh position={[data.p.x, data.p.y + data.N.height / 2, 0]}>
      <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, data.N.height, 24]} />
      <meshStandardMaterial roughness={0.2} metalness={0.2} flatShading={true} />
    </mesh>
  );

  // return (
  //   <mesh position={[data.N.width_original + data.p.x, data.N.height / -2 - data.p.y, 0]}>
  //     <cylinderGeometry />
  //     <meshStandardMaterial />
  //   </mesh>
  // );
};
