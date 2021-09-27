import { FC } from 'react';
import Root from './Root';
import * as THREE from 'three';
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
const randomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return new THREE.Color(color);
};

const rad = (degrees: number) => degrees * (Math.PI / 180);

interface IPart {
  data: Type;
}
export const Part: FC<IPart> = ({ data }) => {
  const bevel = 0.06;

  const materials = {
    flat: <meshBasicMaterial />,
    faces: <meshStandardMaterial color={'white'} roughness={0.8} metalness={0.8} flatShading={true} />,
    smooth: <meshStandardMaterial color={'white'} roughness={0.8} metalness={0.4} flatShading={true} />,
  };

  switch (data.T.shape_tex) {
    case 'Rivets': {
      return <mesh />;
    }

    case 'Half Rivets': {
      return <mesh />;
    }

    case 'Strut': {
      return <mesh />;
    }

    case 'Flat': {
      return (
        <mesh rotation={[0, 0, rad(data.o.z)]} position={[data.p.x, data.p.y + data.N.height / 2, 0]}>
          <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, data.N.height, 4, undefined, true]} />
          {materials.flat}
        </mesh>
      );
    }

    case 'Interstage': {
      return <mesh />;
    }

    case 'Interstage Full': {
      return <mesh />;
    }

    case 'Nozzle_4': {
      return <mesh />;
    }

    default:
    case '_':
    case 'Edges Faces': {
      return (
        <group position={[data.p.x, data.p.y + data.N.height / 2, 0]} rotation={[0, 0, rad(data.o.z)]}>
          <mesh>
            <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, Math.max(0, data.N.height - bevel * 2), 24, undefined, true]} />
            {materials.faces}
          </mesh>
          <mesh position={[0, data.N.height / 2 - bevel / 2, 0]}>
            <cylinderGeometry args={[Math.max(0, data.N.width_b / 2 - bevel / 2), data.N.width_a / 2, Math.min(bevel, data.N.height / 2), 24, undefined, true]} />
            {materials.faces}
          </mesh>
          <mesh position={[0, (data.N.height / 2 - bevel / 2) * -1, 0]}>
            <cylinderGeometry args={[data.N.width_b / 2, Math.max(0, data.N.width_a / 2 - bevel) / 2, Math.min(bevel, data.N.height / 2), 24, undefined, true]} />
            {materials.faces}
          </mesh>
        </group>
      );
    }

    case 'Edges Smooth': {
      const edge = 0.1;

      return (
        <group position={[data.p.x, data.p.y + data.N.height / 2, 0]} rotation={[0, 0, rad(data.o.z)]}>
          <mesh>
            <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, Math.max(0, data.N.height - bevel * 2), 24, undefined, true]} />
            {materials.smooth}
          </mesh>
          <mesh position={[0, data.N.height / 2 - bevel / 2, 0]}>
            <cylinderGeometry args={[Math.max(0, data.N.width_b / 2 - bevel / 2), data.N.width_a / 2, Math.min(bevel, data.N.height / 2), 24, undefined, true]} />
            {materials.smooth}
          </mesh>
          <mesh position={[0, (data.N.height / 2 - bevel / 2) * -1, 0]}>
            <cylinderGeometry args={[data.N.width_b / 2, Math.max(0, data.N.width_a / 2 - bevel) / 2, Math.min(bevel, data.N.height / 2), 24, undefined, true]} />
            {materials.smooth}
          </mesh>
        </group>
      );
    }

    case 'Flat Smooth': {
      return (
        <mesh rotation={[0, 0, rad(data.o.z)]} position={[data.p.x, data.p.y + data.N.height / 2, 0]}>
          <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, data.N.height, 24, undefined, true]} />
          {materials.smooth}
        </mesh>
      );
    }
  }
};
