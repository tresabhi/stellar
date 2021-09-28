import { FC } from 'react';
import * as _ from 'lodash';
import { Type as Root } from './Root';
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
// const randomColor = () => {
//   var letters = '0123456789ABCDEF';
//   var color = '#';
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return new THREE.Color(color);
// };

const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

interface IPart {
  data: Type;
}
export const Part: FC<IPart> = ({ data }) => {
  const faces = 24;
  const bevelMargin = 0.1;
  const rivetMargin = 0.04;
  const rivetCount = Math.floor(faces / 4);
  const rotation = data.o.z * (Math.PI / 180);
  const rimSlopeHeight = 0.1;
  const rimHeight = 0.3;
  const color = 'white';

  const materials = {
    flat: <meshBasicMaterial />,
    faces: <meshStandardMaterial color={color} roughness={0.8} metalness={0.8} flatShading={true} />,
    smooth: <meshStandardMaterial color={color} roughness={0.8} metalness={0.8} flatShading={false} />,
  };

  switch (data.T.shape_tex) {
    case 'Rivets': {
      const rivets = _.times(rivetCount, (index) => (
        <mesh rotation={[0, (index / rivetCount) * 90 * (Math.PI / 180), 0]}>
          <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, data.N.height, 4, undefined, true]} />
          {materials.faces}
        </mesh>
      ));

      return (
        <group rotation={[0, 0, rotation]} position={[data.p.x, data.p.y + data.N.height / 2, 0]}>
          <mesh>
            <cylinderGeometry args={[Math.max(0, data.N.width_b / 2 - rivetMargin), Math.max(0, data.N.width_a / 2 - rivetMargin), data.N.height, faces, undefined, true]} />
            {materials.faces}
          </mesh>
          {rivets}
        </group>
      );
    }

    case 'Half Rivets': {
      const rivets = _.times(rivetCount, (index) => (
        <mesh rotation={[0, (index / rivetCount) * 90 * (Math.PI / 180), 0]} position={[0, data.N.height / -4, 0]}>
          <cylinderGeometry args={[(data.N.width_b + data.N.width_a) / 4, data.N.width_a / 2, data.N.height / 2, 4, undefined, true]} />
          {materials.faces}
        </mesh>
      ));

      return (
        <group rotation={[0, 0, rotation]} position={[data.p.x, data.p.y + data.N.height / 2, 0]}>
          <mesh position={[0, data.N.height / -4, 0]}>
            <cylinderGeometry args={[Math.max(0, (data.N.width_b + data.N.width_a) / 4 - rivetMargin), Math.max(0, data.N.width_a / 2 - rivetMargin), data.N.height / 2, faces, undefined, true]} />
            {materials.faces}
          </mesh>
          <mesh position={[0, data.N.height / 4, 0]}>
            <cylinderGeometry args={[data.N.width_b / 2, (data.N.width_b + data.N.width_a) / 4, data.N.height / 2, faces, undefined, true]} />
            {materials.faces}
          </mesh>
          {rivets}
        </group>
      );
    }

    case 'Strut': {
      return <mesh />;
    }

    case 'Flat': {
      return (
        <mesh rotation={[0, 0, rotation]} position={[data.p.x, data.p.y + data.N.height / 2, 0]}>
          <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, data.N.height, 4, undefined, true]} />
          {materials.flat}
        </mesh>
      );
    }

    case 'Interstage': {
      const rivets = _.times(rivetCount, (index) => (
        <mesh rotation={[0, (index / rivetCount) * 90 * (Math.PI / 180), 0]}>
          <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, data.N.height, 4, undefined, true]} />
          {materials.faces}
        </mesh>
      ));

      return (
        <group rotation={[0, 0, rotation]} position={[data.p.x, data.p.y + data.N.height / 2, 0]}>
          <mesh>
            <cylinderGeometry args={[Math.max(0, data.N.width_b / 2 - rivetMargin), Math.max(0, data.N.width_a / 2 - rivetMargin), data.N.height, faces, undefined, true]} />
            {materials.faces}
          </mesh>
          <mesh position={[0, Math.min(data.N.height, data.N.height - rimHeight) / 2, 0]}>
            <cylinderGeometry args={[data.N.width_b / 2, lerp(data.N.width_b, data.N.width_a, rimHeight / data.N.height / 1) / 2, Math.min(data.N.height, rimHeight), faces, undefined, true]} />
            {materials.faces}
          </mesh>
          <mesh position={[0, Math.min(data.N.height, data.N.height - rimSlopeHeight) / 2 - rimHeight, 0]}>
            <cylinderGeometry args={[lerp(data.N.width_b, data.N.width_a, rimHeight / data.N.height / 1) / 2, Math.max(0, lerp(data.N.width_b, data.N.width_a, (rimHeight + rimSlopeHeight) / data.N.height / 1) / 2 - rivetMargin), Math.min(data.N.height, rimSlopeHeight), faces, undefined, true]} />
            {materials.faces}
          </mesh>
          {rivets}
        </group>
      );
    }

    case 'Interstage Full': {
      const rivets = _.times(rivetCount, (index) => (
        <mesh rotation={[0, (index / rivetCount) * 90 * (Math.PI / 180), 0]}>
          <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, data.N.height, 4, undefined, true]} />
          {materials.faces}
        </mesh>
      ));

      return (
        <group rotation={[0, 0, rotation]} position={[data.p.x, data.p.y + data.N.height / 2, 0]}>
          <mesh>
            <cylinderGeometry args={[Math.max(0, data.N.width_b / 2 - rivetMargin), Math.max(0, data.N.width_a / 2 - rivetMargin), data.N.height, faces, undefined, true]} />
            {materials.faces}
          </mesh>
          <mesh position={[0, Math.min(data.N.height, data.N.height - rimHeight) / 2, 0]}>
            <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, Math.min(data.N.height, rimHeight), faces, undefined, true]} />
            {materials.faces}
          </mesh>
          <mesh position={[0, Math.min(data.N.height, data.N.height - rimHeight - rimSlopeHeight * 2) / 2, 0]}>
            <cylinderGeometry args={[data.N.width_b / 2, Math.max(0, data.N.width_a / 2 - rivetMargin), Math.min(data.N.height, rimHeight), faces, undefined, true]} />
            {materials.faces}
          </mesh>
          <mesh position={[0, Math.min(data.N.height, data.N.height - rimHeight) / -2, 0]}>
            <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, Math.min(data.N.height, rimHeight), faces, undefined, true]} />
            {materials.faces}
          </mesh>
          <mesh position={[0, Math.min(data.N.height, data.N.height - rimHeight - rimSlopeHeight * 2) / 2, 0]}>
            <cylinderGeometry args={[data.N.width_b / 2, Math.max(0, data.N.width_a / 2 - rivetMargin), Math.min(data.N.height, rimHeight), faces, undefined, true]} />
            {materials.faces}
          </mesh>
          {rivets}
        </group>
      );
    }

    case 'Nozzle_4': {
      return <mesh />;
    }

    default:
    case '_':
    case 'Edges Faces': {
      return (
        <group position={[data.p.x, data.p.y + data.N.height / 2, 0]} rotation={[0, 0, rotation]}>
          <mesh>
            <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, Math.max(0, data.N.height - bevelMargin * 2), faces, undefined, true]} />
            {materials.faces}
          </mesh>
          <mesh position={[0, Math.max(data.N.height / 4, (data.N.height - bevelMargin) / 2), 0]}>
            <cylinderGeometry args={[Math.max(0, data.N.width_b / 2 - bevelMargin), data.N.width_b / 2, Math.min(bevelMargin, data.N.height / 2), faces, undefined, true]} />
            {materials.faces}
          </mesh>
          <mesh position={[0, Math.min(data.N.height / -4, (data.N.height - bevelMargin) / -2), 0]}>
            <cylinderGeometry args={[data.N.width_a / 2, Math.max(0, data.N.width_a / 2 - bevelMargin), Math.min(bevelMargin, data.N.height / 2), faces, undefined, true]} />
            {materials.faces}
          </mesh>
        </group>
      );
    }

    case 'Edges Smooth': {
      return (
        <group position={[data.p.x, data.p.y + data.N.height / 2, 0]} rotation={[0, 0, rotation]}>
          <mesh>
            <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, Math.max(0, data.N.height - bevelMargin * 2), faces, undefined, true]} />
            {materials.smooth}
          </mesh>
          <mesh position={[0, Math.max(data.N.height / 4, (data.N.height - bevelMargin) / 2), 0]}>
            <cylinderGeometry args={[Math.max(0, data.N.width_b / 2 - bevelMargin), data.N.width_b / 2, Math.min(bevelMargin, data.N.height / 2), faces, undefined, true]} />
            {materials.smooth}
          </mesh>
          <mesh position={[0, Math.min(data.N.height / -4, (data.N.height - bevelMargin) / -2), 0]}>
            <cylinderGeometry args={[data.N.width_a / 2, Math.max(0, data.N.width_a / 2 - bevelMargin), Math.min(bevelMargin, data.N.height / 2), faces, undefined, true]} />
            {materials.smooth}
          </mesh>
        </group>
      );
    }

    case 'Flat Smooth': {
      return (
        <mesh rotation={[0, 0, rotation]} position={[data.p.x, data.p.y + data.N.height / 2, 0]}>
          <cylinderGeometry args={[data.N.width_b / 2, data.N.width_a / 2, data.N.height, faces, undefined, true]} />
          {materials.smooth}
        </mesh>
      );
    }
  }
};
