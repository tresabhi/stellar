import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import { times } from 'lodash';
import { memo } from 'react';
import { lerp } from 'three/src/math/MathUtils';
import { PartModule } from 'types/Parts';
import { DefaultPartData, PartWithTranslations } from './Default';

export interface FuelTank extends PartWithTranslations {
  n: 'Fuel Tank';
  N: {
    width_original: number;
    width_a: number;
    width_b: number;
    height: number;
    fuel_percent: number;
  };
  T: {
    color_tex:
      | '_'
      | 'Color_White'
      | 'Color_Gray'
      | 'Color_Black'
      | 'Color_Orange'
      | 'Metal'
      | 'Metal_2'
      | 'Metal_3'
      | 'Metal_4'
      | 'Pattern_Squares'
      | 'Pattern_Bars_Band'
      | 'Pattern_Bars'
      | 'Pattern_Bars_Half'
      | 'Pattern_Half'
      | 'Pattern_Cone'
      | 'SV_S1_USA'
      | 'SV_S1_Flag'
      | 'SV_S2'
      | 'SV_S3'
      | 'USA_Logo'
      | 'Gold_Foil'
      | 'Nozzle_2'
      | 'Nozzle_3'
      | 'Array'
      | 'Arrows'
      | 'Strut_Gray';
    shape_tex:
      | '_'
      | 'Flat'
      | 'Flat Smooth'
      | 'Flat Smooth 4'
      | 'Flat Faces'
      | 'Edges Smooth'
      | 'Edges Faces'
      | 'Edges Faces Top'
      | 'Edges Faces Bottom'
      | 'Rivets'
      | 'Half Rivets'
      | 'Interstage'
      | 'Interstage Full'
      | 'Fairing'
      | 'Nozzle_4'
      | 'Capsule'
      | 'Strut';
  };
}

export const FuelTankData: FuelTank = {
  ...DefaultPartData,

  meta: {
    ...DefaultPartData.meta,

    label: 'Fuel Tank',
  },
  n: 'Fuel Tank',
  N: {
    width_original: 2,
    width_a: 2,
    width_b: 2,
    height: 2,
    fuel_percent: 1,
  },
  T: {
    color_tex: '_',
    shape_tex: '_',
  },
};

export const FuelTankLayoutComponent = memo<{ data: FuelTank }>(({ data }) => {
  const faceCount = 24;

  const bevelMargin = 0.05;

  const rivetMargin = 0.04;
  const rivetCount = Math.floor(faceCount / 4);

  const rotation = data.o.z * (Math.PI / 180);

  const rimHeight = 0.1;
  const rimSlopeHeight = 0.1;

  const nozzlesPerMeter = 3;
  const nozzleHeight = 0.1;
  const nozzleOffset = 1 / 6;

  const color = 'white';

  const materials = {
    flat: <meshBasicMaterial />,
    faces: (
      <meshStandardMaterial
        color={color}
        roughness={0.8}
        metalness={0.8}
        flatShading={true}
      />
    ),
    smooth: (
      <meshStandardMaterial
        color={color}
        roughness={0.8}
        metalness={0.8}
        flatShading={false}
      />
    ),
  };

  switch (data.T.shape_tex) {
    case 'Rivets': {
      const rivets = times(rivetCount, (index) => (
        <mesh
          key={`rivet-${index}`}
          rotation={[0, (index / rivetCount) * 90 * (Math.PI / 180), 0]}
        >
          <cylinderGeometry
            args={[
              data.N.width_b / 2,
              data.N.width_a / 2,
              data.N.height,
              4,
              undefined,
              true,
            ]}
          />
          {materials.faces}
        </mesh>
      ));

      return (
        <group
          scale={[data.o.x, data.o.y, 1]}
          rotation={[0, 0, rotation]}
          position={[data.p.x, data.p.y + data.N.height / 2, 0]}
        >
          <mesh>
            <cylinderGeometry
              args={[
                Math.max(0, data.N.width_b / 2 - rivetMargin),
                Math.max(0, data.N.width_a / 2 - rivetMargin),
                data.N.height,
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          {rivets}
        </group>
      );
    }

    case 'Half Rivets': {
      const rivets = times(rivetCount, (index) => (
        <mesh
          key={`rivet-${index}`}
          rotation={[0, (index / rivetCount) * 90 * (Math.PI / 180), 0]}
          position={[0, data.N.height / -4, 0]}
        >
          <cylinderGeometry
            args={[
              (data.N.width_b + data.N.width_a) / 4,
              data.N.width_a / 2,
              data.N.height / 2,
              4,
              undefined,
              true,
            ]}
          />
          {materials.faces}
        </mesh>
      ));

      return (
        <group
          scale={[data.o.x, data.o.y, 1]}
          rotation={[0, 0, rotation]}
          position={[data.p.x, data.p.y + data.N.height / 2, 0]}
        >
          <mesh position={[0, data.N.height / -4, 0]}>
            <cylinderGeometry
              args={[
                Math.max(
                  0,
                  (data.N.width_b + data.N.width_a) / 4 - rivetMargin,
                ),
                Math.max(0, data.N.width_a / 2 - rivetMargin),
                data.N.height / 2,
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh position={[0, data.N.height / 4, 0]}>
            <cylinderGeometry
              args={[
                data.N.width_b / 2,
                (data.N.width_b + data.N.width_a) / 4,
                data.N.height / 2,
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          {rivets}
        </group>
      );
    }

    case 'Flat': {
      return (
        <mesh
          scale={[data.o.x, data.o.y, 1]}
          rotation={[0, 0, rotation]}
          position={[data.p.x, data.p.y + data.N.height / 2, 0]}
        >
          <cylinderGeometry
            args={[
              data.N.width_b / 2,
              data.N.width_a / 2,
              data.N.height,
              4,
              undefined,
              true,
            ]}
          />
          {materials.flat}
        </mesh>
      );
    }

    case 'Interstage': {
      const rivets = times(rivetCount, (index) => (
        <mesh
          key={`rivet-${index}`}
          rotation={[0, (index / rivetCount) * 90 * (Math.PI / 180), 0]}
        >
          <cylinderGeometry
            args={[
              data.N.width_b / 2,
              data.N.width_a / 2,
              data.N.height,
              4,
              undefined,
              true,
            ]}
          />
          {materials.faces}
        </mesh>
      ));

      return (
        <group
          scale={[data.o.x, data.o.y, 1]}
          rotation={[0, 0, rotation]}
          position={[data.p.x, data.p.y + data.N.height / 2, 0]}
        >
          <mesh>
            <cylinderGeometry
              args={[
                Math.max(0, data.N.width_b / 2 - rivetMargin),
                Math.max(0, data.N.width_a / 2 - rivetMargin),
                data.N.height,
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh
            position={[
              0,
              Math.min(data.N.height, data.N.height - rimHeight) / 2,
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                data.N.width_b / 2,
                lerp(
                  data.N.width_b,
                  data.N.width_a,
                  rimHeight / data.N.height / 1,
                ) / 2,
                Math.min(data.N.height, rimHeight),
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh
            position={[
              0,
              Math.min(data.N.height, data.N.height - rimSlopeHeight) / 2 -
                rimHeight,
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                lerp(
                  data.N.width_b,
                  data.N.width_a,
                  rimHeight / data.N.height / 1,
                ) / 2,
                Math.max(
                  0,
                  lerp(
                    data.N.width_b,
                    data.N.width_a,
                    (rimHeight + rimSlopeHeight) / data.N.height / 1,
                  ) /
                    2 -
                    rivetMargin,
                ),
                Math.min(data.N.height, rimSlopeHeight),
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          {rivets}
        </group>
      );
    }

    case 'Interstage Full': {
      const rivets = times(rivetCount, (index) => (
        <mesh
          key={`rivet-${index}`}
          rotation={[0, (index / rivetCount) * 90 * (Math.PI / 180), 0]}
        >
          <cylinderGeometry
            args={[
              data.N.width_b / 2,
              data.N.width_a / 2,
              data.N.height,
              4,
              undefined,
              true,
            ]}
          />
          {materials.faces}
        </mesh>
      ));

      return (
        <group
          scale={[data.o.x, data.o.y, 1]}
          rotation={[0, 0, rotation]}
          position={[data.p.x, data.p.y + data.N.height / 2, 0]}
        >
          <mesh>
            <cylinderGeometry
              args={[
                Math.max(0, data.N.width_b / 2 - rivetMargin),
                Math.max(0, data.N.width_a / 2 - rivetMargin),
                data.N.height,
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh
            position={[
              0,
              Math.min(data.N.height, data.N.height - rimHeight) / 2,
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                data.N.width_b / 2,
                lerp(
                  data.N.width_b,
                  data.N.width_a,
                  rimHeight / data.N.height / 1,
                ) / 2,
                Math.min(data.N.height, rimHeight),
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh
            position={[
              0,
              Math.min(data.N.height, data.N.height - rimSlopeHeight) / 2 -
                rimHeight,
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                lerp(
                  data.N.width_b,
                  data.N.width_a,
                  rimHeight / data.N.height / 1,
                ) / 2,
                Math.max(
                  0,
                  lerp(
                    data.N.width_b,
                    data.N.width_a,
                    (rimHeight + rimSlopeHeight) / data.N.height / 1,
                  ) /
                    2 -
                    rivetMargin,
                ),
                Math.min(data.N.height, rimSlopeHeight),
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh
            position={[
              0,
              Math.min(data.N.height, data.N.height - rimHeight) / -2,
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                lerp(
                  data.N.width_a,
                  data.N.width_b,
                  rimHeight / data.N.height / 1,
                ) / 2,
                data.N.width_a / 2,
                Math.min(data.N.height, rimHeight),
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh
            position={[
              0,
              Math.min(data.N.height, data.N.height - rimSlopeHeight) / -2 +
                rimHeight,
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                Math.max(
                  0,
                  lerp(
                    data.N.width_a,
                    data.N.width_b,
                    (rimHeight + rimSlopeHeight) / data.N.height / 1,
                  ) /
                    2 -
                    rivetMargin,
                ),
                lerp(
                  data.N.width_a,
                  data.N.width_b,
                  rimHeight / data.N.height / 1,
                ) / 2,
                Math.min(data.N.height, rimSlopeHeight),
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          {rivets}
        </group>
      );
    }

    case 'Nozzle_4': {
      const nozzleCount = Math.floor(data.N.height * nozzlesPerMeter);
      const nozzles = times(nozzleCount, (index) => (
        <group
          key={`nozzle-${index}`}
          position={[
            0,
            (index / nozzleCount) * data.N.height -
              data.N.height / 2 +
              nozzleOffset,
            0,
          ]}
        >
          <mesh position={[0, nozzleHeight / 2, 0]}>
            <cylinderGeometry
              args={[
                Math.max(
                  0,
                  lerp(
                    data.N.width_a,
                    data.N.width_b,
                    index / nozzleCount +
                      (nozzleHeight / 2 + nozzleOffset) / data.N.height,
                  ) /
                    2 -
                    rivetMargin,
                ),
                lerp(
                  data.N.width_a,
                  data.N.width_b,
                  index / nozzleCount + nozzleOffset / data.N.height,
                ) / 2,
                nozzleHeight / 2,
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh>
            <cylinderGeometry
              args={[
                lerp(
                  data.N.width_a,
                  data.N.width_b,
                  index / nozzleCount + nozzleOffset / data.N.height,
                ) / 2,
                Math.max(
                  0,
                  lerp(
                    data.N.width_a,
                    data.N.width_b,
                    index / nozzleCount -
                      (nozzleHeight / 2 - nozzleOffset) / data.N.height,
                  ) /
                    2 -
                    rivetMargin,
                ),
                nozzleHeight / 2,
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
        </group>
      ));

      return (
        <group
          scale={[data.o.x, data.o.y, 1]}
          rotation={[0, 0, rotation]}
          position={[data.p.x, data.p.y + data.N.height / 2, 0]}
        >
          <mesh>
            <cylinderGeometry
              args={[
                Math.max(0, data.N.width_b / 2 - rivetMargin),
                Math.max(0, data.N.width_a / 2 - rivetMargin),
                data.N.height,
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          {nozzles}
        </group>
      );
    }

    /**
     * Strut fuel tanks are not supported yet, I'm going to add them when I
     * implement low poly parts (which are going to be closer to what's
     * in-game) and it's going to replace this hi-poly crap
     */
    default:
    case '_':
    case 'Strut':
    case 'Edges Faces': {
      return (
        <group
          scale={[data.o.x, data.o.y, 1]}
          position={[data.p.x, data.p.y + data.N.height / 2, 0]}
          rotation={[0, 0, rotation]}
        >
          <mesh>
            <cylinderGeometry
              args={[
                data.N.width_b / 2,
                data.N.width_a / 2,
                Math.max(0, data.N.height - bevelMargin * 2),
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh
            position={[
              0,
              Math.max(data.N.height / 4, (data.N.height - bevelMargin) / 2),
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                Math.max(0, data.N.width_b / 2 - bevelMargin),
                data.N.width_b / 2,
                Math.min(bevelMargin, data.N.height / 2),
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh
            position={[
              0,
              Math.min(data.N.height / -4, (data.N.height - bevelMargin) / -2),
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                data.N.width_a / 2,
                Math.max(0, data.N.width_a / 2 - bevelMargin),
                Math.min(bevelMargin, data.N.height / 2),
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
        </group>
      );
    }

    case 'Edges Smooth': {
      return (
        <group
          scale={[data.o.x, data.o.y, 1]}
          position={[data.p.x, data.p.y + data.N.height / 2, 0]}
          rotation={[0, 0, rotation]}
        >
          <mesh>
            <cylinderGeometry
              args={[
                data.N.width_b / 2,
                data.N.width_a / 2,
                Math.max(0, data.N.height - bevelMargin * 2),
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.smooth}
          </mesh>
          <mesh
            position={[
              0,
              Math.max(data.N.height / 4, (data.N.height - bevelMargin) / 2),
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                Math.max(0, data.N.width_b / 2 - bevelMargin),
                data.N.width_b / 2,
                Math.min(bevelMargin, data.N.height / 2),
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.smooth}
          </mesh>
          <mesh
            position={[
              0,
              Math.min(data.N.height / -4, (data.N.height - bevelMargin) / -2),
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                data.N.width_a / 2,
                Math.max(0, data.N.width_a / 2 - bevelMargin),
                Math.min(bevelMargin, data.N.height / 2),
                faceCount,
                undefined,
                true,
              ]}
            />
            {materials.smooth}
          </mesh>
        </group>
      );
    }

    case 'Flat Smooth': {
      return (
        <mesh
          scale={[data.o.x, data.o.y, 1]}
          rotation={[0, 0, rotation]}
          position={[data.p.x, data.p.y + data.N.height / 2, 0]}
        >
          <cylinderGeometry
            args={[
              data.N.width_b / 2,
              data.N.width_a / 2,
              data.N.height,
              faceCount,
              undefined,
              true,
            ]}
          />
          {materials.smooth}
        </mesh>
      );
    }
  }
});

export const FuelTankIcon = Icon;

const FuelTankPart: PartModule = {
  data: FuelTankData,

  Icon: FuelTankIcon,
  LayoutComponent: FuelTankLayoutComponent,

  isExportable: true,
};
export default FuelTankPart;
