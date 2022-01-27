import '@react-three/fiber';
import { ReactComponent as FuelTankIcon } from 'assets/icons/fuel-tank.svg';
import lerp from 'functions/lerp';
import DeepPartial from 'core/types/DeepPartial';
import { PartModule } from 'core/types/Parts';
import { merge, times } from 'lodash';
import { FC, memo } from 'react';
import RootPart, { RootType, RootVanillaType } from './Root';

const Icon = FuelTankIcon;

export interface FuelTankVanillaType extends RootVanillaType {
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
      | 'Capsule' // Was listed as 'capsue'. Why?
      | 'Strut';
  };
}
export interface FuelTankType extends RootType, FuelTankVanillaType {}

const VANILLA_DATA = merge<{}, RootVanillaType, Partial<FuelTankVanillaType>>(
  {},
  RootPart.VANILLA_DATA!,
  {
    n: 'Fuel Tank',
    N: {
      width_original: 2,
      width_a: 2,
      width_b: 2,
      height: 2,
      fuel_percent: 1,
    },
    T: { color_tex: '_', shape_tex: '_' },
  },
) as FuelTankVanillaType;
const DATA: FuelTankType = merge<
  {},
  RootType,
  FuelTankVanillaType,
  DeepPartial<FuelTankType>
>({}, RootPart.DATA, VANILLA_DATA, {
  meta: { label: 'Fuel Tank' },
});

interface LayoutComponentProps {
  data: FuelTankType;
}
const LayoutComponent: FC<LayoutComponentProps> = memo(({ data }) => {
  const FACE_COUNT = 24;
  const BEVEL_MARGIN = 0.05;
  const RIVET_MARGIN = 0.04;
  const RIVET_COUNT = Math.floor(FACE_COUNT / 4);
  const ROTATION = data.o.z * (Math.PI / 180);
  const RIM_HEIGHT = 0.1;
  const RIM_SLOPE_HEIGHT = 0.1;
  const NOZZLE_HEIGHT = 0.1;
  const NOZZLE_OFFSET = 1 / 6;
  const NOZZLES_PER_METER = 3;
  const COLOR = 'white';

  const materials = {
    flat: <meshBasicMaterial />,
    faces: (
      <meshStandardMaterial
        color={COLOR}
        roughness={0.8}
        metalness={0.8}
        flatShading={true}
      />
    ),
    smooth: (
      <meshStandardMaterial
        color={COLOR}
        roughness={0.8}
        metalness={0.8}
        flatShading={false}
      />
    ),
  };

  switch (data.T.shape_tex) {
    case 'Rivets': {
      const rivets = times(RIVET_COUNT, (index) => (
        <mesh
          key={`rivet-${index}`}
          rotation={[0, (index / RIVET_COUNT) * 90 * (Math.PI / 180), 0]}
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
          rotation={[0, 0, ROTATION]}
          position={[data.p.x, data.p.y + data.N.height / 2, 0]}
        >
          <mesh>
            <cylinderGeometry
              args={[
                Math.max(0, data.N.width_b / 2 - RIVET_MARGIN),
                Math.max(0, data.N.width_a / 2 - RIVET_MARGIN),
                data.N.height,
                FACE_COUNT,
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
      const rivets = times(RIVET_COUNT, (index) => (
        <mesh
          key={`rivet-${index}`}
          rotation={[0, (index / RIVET_COUNT) * 90 * (Math.PI / 180), 0]}
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
          rotation={[0, 0, ROTATION]}
          position={[data.p.x, data.p.y + data.N.height / 2, 0]}
        >
          <mesh position={[0, data.N.height / -4, 0]}>
            <cylinderGeometry
              args={[
                Math.max(
                  0,
                  (data.N.width_b + data.N.width_a) / 4 - RIVET_MARGIN,
                ),
                Math.max(0, data.N.width_a / 2 - RIVET_MARGIN),
                data.N.height / 2,
                FACE_COUNT,
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
                FACE_COUNT,
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
          rotation={[0, 0, ROTATION]}
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
      const rivets = times(RIVET_COUNT, (index) => (
        <mesh
          key={`rivet-${index}`}
          rotation={[0, (index / RIVET_COUNT) * 90 * (Math.PI / 180), 0]}
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
          rotation={[0, 0, ROTATION]}
          position={[data.p.x, data.p.y + data.N.height / 2, 0]}
        >
          <mesh>
            <cylinderGeometry
              args={[
                Math.max(0, data.N.width_b / 2 - RIVET_MARGIN),
                Math.max(0, data.N.width_a / 2 - RIVET_MARGIN),
                data.N.height,
                FACE_COUNT,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh
            position={[
              0,
              Math.min(data.N.height, data.N.height - RIM_HEIGHT) / 2,
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                data.N.width_b / 2,
                lerp(
                  data.N.width_b,
                  data.N.width_a,
                  RIM_HEIGHT / data.N.height / 1,
                ) / 2,
                Math.min(data.N.height, RIM_HEIGHT),
                FACE_COUNT,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh
            position={[
              0,
              Math.min(data.N.height, data.N.height - RIM_SLOPE_HEIGHT) / 2 -
                RIM_HEIGHT,
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                lerp(
                  data.N.width_b,
                  data.N.width_a,
                  RIM_HEIGHT / data.N.height / 1,
                ) / 2,
                Math.max(
                  0,
                  lerp(
                    data.N.width_b,
                    data.N.width_a,
                    (RIM_HEIGHT + RIM_SLOPE_HEIGHT) / data.N.height / 1,
                  ) /
                    2 -
                    RIVET_MARGIN,
                ),
                Math.min(data.N.height, RIM_SLOPE_HEIGHT),
                FACE_COUNT,
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
      const rivets = times(RIVET_COUNT, (index) => (
        <mesh
          key={`rivet-${index}`}
          rotation={[0, (index / RIVET_COUNT) * 90 * (Math.PI / 180), 0]}
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
          rotation={[0, 0, ROTATION]}
          position={[data.p.x, data.p.y + data.N.height / 2, 0]}
        >
          <mesh>
            <cylinderGeometry
              args={[
                Math.max(0, data.N.width_b / 2 - RIVET_MARGIN),
                Math.max(0, data.N.width_a / 2 - RIVET_MARGIN),
                data.N.height,
                FACE_COUNT,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh
            position={[
              0,
              Math.min(data.N.height, data.N.height - RIM_HEIGHT) / 2,
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                data.N.width_b / 2,
                lerp(
                  data.N.width_b,
                  data.N.width_a,
                  RIM_HEIGHT / data.N.height / 1,
                ) / 2,
                Math.min(data.N.height, RIM_HEIGHT),
                FACE_COUNT,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh
            position={[
              0,
              Math.min(data.N.height, data.N.height - RIM_SLOPE_HEIGHT) / 2 -
                RIM_HEIGHT,
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                lerp(
                  data.N.width_b,
                  data.N.width_a,
                  RIM_HEIGHT / data.N.height / 1,
                ) / 2,
                Math.max(
                  0,
                  lerp(
                    data.N.width_b,
                    data.N.width_a,
                    (RIM_HEIGHT + RIM_SLOPE_HEIGHT) / data.N.height / 1,
                  ) /
                    2 -
                    RIVET_MARGIN,
                ),
                Math.min(data.N.height, RIM_SLOPE_HEIGHT),
                FACE_COUNT,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh
            position={[
              0,
              Math.min(data.N.height, data.N.height - RIM_HEIGHT) / -2,
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                lerp(
                  data.N.width_a,
                  data.N.width_b,
                  RIM_HEIGHT / data.N.height / 1,
                ) / 2,
                data.N.width_a / 2,
                Math.min(data.N.height, RIM_HEIGHT),
                FACE_COUNT,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh
            position={[
              0,
              Math.min(data.N.height, data.N.height - RIM_SLOPE_HEIGHT) / -2 +
                RIM_HEIGHT,
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
                    (RIM_HEIGHT + RIM_SLOPE_HEIGHT) / data.N.height / 1,
                  ) /
                    2 -
                    RIVET_MARGIN,
                ),
                lerp(
                  data.N.width_a,
                  data.N.width_b,
                  RIM_HEIGHT / data.N.height / 1,
                ) / 2,
                Math.min(data.N.height, RIM_SLOPE_HEIGHT),
                FACE_COUNT,
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
      const nozzleCount = Math.floor(data.N.height * NOZZLES_PER_METER);
      const nozzles = times(nozzleCount, (index) => (
        <group
          key={`nozzle-${index}`}
          position={[
            0,
            (index / nozzleCount) * data.N.height -
              data.N.height / 2 +
              NOZZLE_OFFSET,
            0,
          ]}
        >
          <mesh position={[0, NOZZLE_HEIGHT / 2, 0]}>
            <cylinderGeometry
              args={[
                Math.max(
                  0,
                  lerp(
                    data.N.width_a,
                    data.N.width_b,
                    index / nozzleCount +
                      (NOZZLE_HEIGHT / 2 + NOZZLE_OFFSET) / data.N.height,
                  ) /
                    2 -
                    RIVET_MARGIN,
                ),
                lerp(
                  data.N.width_a,
                  data.N.width_b,
                  index / nozzleCount + NOZZLE_OFFSET / data.N.height,
                ) / 2,
                NOZZLE_HEIGHT / 2,
                FACE_COUNT,
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
                  index / nozzleCount + NOZZLE_OFFSET / data.N.height,
                ) / 2,
                Math.max(
                  0,
                  lerp(
                    data.N.width_a,
                    data.N.width_b,
                    index / nozzleCount -
                      (NOZZLE_HEIGHT / 2 - NOZZLE_OFFSET) / data.N.height,
                  ) /
                    2 -
                    RIVET_MARGIN,
                ),
                NOZZLE_HEIGHT / 2,
                FACE_COUNT,
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
          rotation={[0, 0, ROTATION]}
          position={[data.p.x, data.p.y + data.N.height / 2, 0]}
        >
          <mesh>
            <cylinderGeometry
              args={[
                Math.max(0, data.N.width_b / 2 - RIVET_MARGIN),
                Math.max(0, data.N.width_a / 2 - RIVET_MARGIN),
                data.N.height,
                FACE_COUNT,
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
          rotation={[0, 0, ROTATION]}
        >
          <mesh>
            <cylinderGeometry
              args={[
                data.N.width_b / 2,
                data.N.width_a / 2,
                Math.max(0, data.N.height - BEVEL_MARGIN * 2),
                FACE_COUNT,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh
            position={[
              0,
              Math.max(data.N.height / 4, (data.N.height - BEVEL_MARGIN) / 2),
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                Math.max(0, data.N.width_b / 2 - BEVEL_MARGIN),
                data.N.width_b / 2,
                Math.min(BEVEL_MARGIN, data.N.height / 2),
                FACE_COUNT,
                undefined,
                true,
              ]}
            />
            {materials.faces}
          </mesh>
          <mesh
            position={[
              0,
              Math.min(data.N.height / -4, (data.N.height - BEVEL_MARGIN) / -2),
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                data.N.width_a / 2,
                Math.max(0, data.N.width_a / 2 - BEVEL_MARGIN),
                Math.min(BEVEL_MARGIN, data.N.height / 2),
                FACE_COUNT,
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
          rotation={[0, 0, ROTATION]}
        >
          <mesh>
            <cylinderGeometry
              args={[
                data.N.width_b / 2,
                data.N.width_a / 2,
                Math.max(0, data.N.height - BEVEL_MARGIN * 2),
                FACE_COUNT,
                undefined,
                true,
              ]}
            />
            {materials.smooth}
          </mesh>
          <mesh
            position={[
              0,
              Math.max(data.N.height / 4, (data.N.height - BEVEL_MARGIN) / 2),
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                Math.max(0, data.N.width_b / 2 - BEVEL_MARGIN),
                data.N.width_b / 2,
                Math.min(BEVEL_MARGIN, data.N.height / 2),
                FACE_COUNT,
                undefined,
                true,
              ]}
            />
            {materials.smooth}
          </mesh>
          <mesh
            position={[
              0,
              Math.min(data.N.height / -4, (data.N.height - BEVEL_MARGIN) / -2),
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                data.N.width_a / 2,
                Math.max(0, data.N.width_a / 2 - BEVEL_MARGIN),
                Math.min(BEVEL_MARGIN, data.N.height / 2),
                FACE_COUNT,
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
          rotation={[0, 0, ROTATION]}
          position={[data.p.x, data.p.y + data.N.height / 2, 0]}
        >
          <cylinderGeometry
            args={[
              data.N.width_b / 2,
              data.N.width_a / 2,
              data.N.height,
              FACE_COUNT,
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

const FuelTankPart: PartModule = {
  Icon,
  VANILLA_DATA,
  DATA,
  LayoutComponent,

  isExportable: true,
};
export default FuelTankPart;
