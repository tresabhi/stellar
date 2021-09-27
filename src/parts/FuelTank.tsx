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
function randomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return new THREE.Color(color);
}

interface IPart {
  data: Type;
}
export const Part: FC<IPart> = ({ data }) => {
  // if (data.T.shape_tex === 'Flat Smooth') {
  //   return (
  //     <mesh position={[data.p.x, data.p.y + data.N.height / 2, 0]}>
  //       <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, data.N.height, 24, undefined, true]} />
  //       <meshStandardMaterial roughness={0.2} metalness={0.2} flatShading={true} />
  //     </mesh>
  //   );
  // } else {
  //   return (
  //     <mesh>
  //       <cylinderGeometry />
  //       <meshBasicMaterial />
  //     </mesh>
  //   );
  // }

  const color = new THREE.Color('rgb(160, 160, 160)');

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
        <mesh position={[data.p.x, data.p.y + data.N.height / 2, 0]}>
          <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, data.N.height, 24, undefined, true]} />
          <meshBasicMaterial />
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

    case 'Edges Faces': {
      const edge = 0.1;
      const material = <meshStandardMaterial color={color} roughness={0.5} metalness={0.5} flatShading={true} />;

      return (
        <group>
          {/* middle */}
          <mesh position={[data.p.x, data.p.y + data.N.height / 2, 0]}>
            <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, Math.max(0, data.N.height - edge * 2), 24, undefined, true]} />
            {material}
          </mesh>

          {/* top */}
          <mesh position={[data.p.x, data.p.y + data.N.height - edge / 2, 0]}>
            <cylinderGeometry args={[data.N.width_b / 2 - edge / 2, data.N.width_a / 2, edge, 24, undefined, true]} />
            {material}
          </mesh>

          {/* bottom */}
          <mesh position={[data.p.x, data.p.y + edge / 2, 0]}>
            <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2 - edge / 2, edge, 24, undefined, true]} />
            {material}
          </mesh>
        </group>
      );
    }

    case 'Edges Smooth': {
      const edge = 0.1;
      const material = <meshStandardMaterial color={color} roughness={0.2} metalness={0.2} flatShading={true} />;

      return (
        <group>
          {/* middle */}
          <mesh position={[data.p.x, data.p.y + data.N.height / 2, 0]}>
            <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, Math.max(0, data.N.height - edge * 2), 24, undefined, true]} />
            {material}
          </mesh>

          {/* top */}
          <mesh position={[data.p.x, data.p.y + data.N.height - edge / 2, 0]}>
            <cylinderGeometry args={[data.N.width_b / 2 - edge / 2, data.N.width_a / 2, edge, 24, undefined, true]} />
            {material}
          </mesh>

          {/* bottom */}
          <mesh position={[data.p.x, data.p.y + edge / 2, 0]}>
            <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2 - edge / 2, edge, 24, undefined, true]} />
            {material}
          </mesh>
        </group>
      );
    }

    case 'Flat Smooth': {
      return (
        <mesh position={[data.p.x, data.p.y + data.N.height / 2, 0]}>
          <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, data.N.height, 24, undefined, true]} />
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.2} flatShading={true} />
        </mesh>
      );
    }

    default: {
      return <mesh />;
    }
  }

  // return (
  //   <mesh position={[data.N.width_original + data.p.x, data.N.height / -2 - data.p.y, 0]}>
  //     <cylinderGeometry />
  //     <meshStandardMaterial />
  //   </mesh>
  // );
};
