import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import usePartDecorations from 'hooks/usePartDecorations';
import usePartTranslations from 'hooks/usePartTranslations';
import useStellarContext from 'hooks/useStellarContext';
import useUndefinedRef from 'hooks/useUndefinedRef';
import { getPartByAddress } from 'interfaces/blueprint';
import { times } from 'lodash';
import { memo } from 'react';
import blueprintStore from 'stores/blueprint';
import { Group, Mesh } from 'three';
import { lerp } from 'three/src/math/MathUtils';
import { PartComponentProps, PartModule } from 'types/Parts';
import compareAddressProps from 'utilities/compareAddressProps';
import { DefaultPartData, PartWithTranslations } from './Default';

const FACE_COUNT = 24;
const BEVEL_MARGIN = 0.05;
const RIVET_MARGIN = 0.04;
const RIVET_COUNT = Math.floor(FACE_COUNT / 4);
const RIM_HEIGHT = 0.1;
const RIM_SLOPE_HEIGHT = 0.1;
const NOZZLES_PER_METER = 3;
const NOZZLE_HEIGHT = 0.1;
const NOZZLE_OFFSET = 1 / 6;
const COLOR = 'white';
const MATERIALS = {
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

// TODO: Reorder these to match typing above
export const FuelTankLayoutComponent = memo<PartComponentProps>(
  ({ address }) => {
    const stellarContext = useStellarContext();
    const data = blueprintStore((state) =>
      getPartByAddress(address, state),
    ) as FuelTank;
    const initialData = getPartByAddress(
      address,
      blueprintStore.getState(),
    ) as FuelTank;
    const initialRotation = data.o.z * (Math.PI / 180);
    const meshRef = useUndefinedRef<Mesh | Group>();

    usePartTranslations(address, meshRef);
    usePartDecorations(address, meshRef);

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
            {MATERIALS.faces}
          </mesh>
        ));

        return (
          <group
            ref={meshRef}
            scale={[initialData.o.x, initialData.o.y, 1]}
            rotation={[0, 0, initialRotation]}
            position={[
              initialData.p.x,
              initialData.p.y + initialData.N.height / 2,
              0,
            ]}
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
              {MATERIALS.faces}
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
            {MATERIALS.faces}
          </mesh>
        ));

        return (
          <group
            ref={meshRef}
            scale={[initialData.o.x, initialData.o.y, 1]}
            rotation={[0, 0, initialRotation]}
            position={[
              initialData.p.x,
              initialData.p.y + initialData.N.height / 2,
              0,
            ]}
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
              {MATERIALS.faces}
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
              {MATERIALS.faces}
            </mesh>
            {rivets}
          </group>
        );
      }

      case 'Flat': {
        return (
          <mesh
            ref={meshRef}
            scale={[initialData.o.x, initialData.o.y, 1]}
            rotation={[0, 0, initialRotation]}
            position={[
              initialData.p.x,
              initialData.p.y + initialData.N.height / 2,
              0,
            ]}
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
            {MATERIALS.flat}
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
            {MATERIALS.faces}
          </mesh>
        ));

        return (
          <group
            ref={meshRef}
            scale={[initialData.o.x, initialData.o.y, 1]}
            rotation={[0, 0, initialRotation]}
            position={[
              initialData.p.x,
              initialData.p.y + initialData.N.height / 2,
              0,
            ]}
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
              {MATERIALS.faces}
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
              {MATERIALS.faces}
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
              {MATERIALS.faces}
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
            {MATERIALS.faces}
          </mesh>
        ));

        return (
          <group
            ref={meshRef}
            scale={[initialData.o.x, initialData.o.y, 1]}
            rotation={[0, 0, initialRotation]}
            position={[
              initialData.p.x,
              initialData.p.y + initialData.N.height / 2,
              0,
            ]}
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
              {MATERIALS.faces}
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
              {MATERIALS.faces}
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
              {MATERIALS.faces}
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
              {MATERIALS.faces}
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
              {MATERIALS.faces}
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
              {MATERIALS.faces}
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
              {MATERIALS.faces}
            </mesh>
          </group>
        ));

        return (
          <group
            ref={meshRef}
            scale={[initialData.o.x, initialData.o.y, 1]}
            rotation={[0, 0, initialRotation]}
            position={[
              initialData.p.x,
              initialData.p.y + initialData.N.height / 2,
              0,
            ]}
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
              {MATERIALS.faces}
            </mesh>
            {nozzles}
          </group>
        );
      }

      /**
       * Strut fuel tanks are not supported yet, I'm going to add them when I
       * reach parity in the way the game renders these parts
       */
      default:
      case '_':
      case 'Strut':
      case 'Edges Faces': {
        return (
          <group
            ref={meshRef}
            scale={[initialData.o.x, initialData.o.y, 1]}
            position={[
              initialData.p.x,
              initialData.p.y + initialData.N.height / 2,
              0,
            ]}
            rotation={[0, 0, initialRotation]}
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
              {MATERIALS.faces}
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
              {MATERIALS.faces}
            </mesh>
            <mesh
              position={[
                0,
                Math.min(
                  data.N.height / -4,
                  (data.N.height - BEVEL_MARGIN) / -2,
                ),
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
              {MATERIALS.faces}
            </mesh>
          </group>
        );
      }

      case 'Edges Smooth': {
        return (
          <group
            ref={meshRef}
            scale={[initialData.o.x, initialData.o.y, 1]}
            position={[
              initialData.p.x,
              initialData.p.y + initialData.N.height / 2,
              0,
            ]}
            rotation={[0, 0, initialRotation]}
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
              {MATERIALS.smooth}
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
              {MATERIALS.smooth}
            </mesh>
            <mesh
              position={[
                0,
                Math.min(
                  data.N.height / -4,
                  (data.N.height - BEVEL_MARGIN) / -2,
                ),
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
              {MATERIALS.smooth}
            </mesh>
          </group>
        );
      }

      case 'Flat Smooth': {
        return (
          <mesh
            ref={meshRef}
            scale={[initialData.o.x, initialData.o.y, 1]}
            rotation={[0, 0, initialRotation]}
            position={[
              initialData.p.x,
              initialData.p.y + initialData.N.height / 2,
              0,
            ]}
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
            {MATERIALS.smooth}
          </mesh>
        );
      }
    }
  },
  compareAddressProps,
);

export const FuelTankIcon = Icon;

const FuelTankPart: PartModule = {
  data: FuelTankData,

  Icon: FuelTankIcon,
  LayoutComponent: FuelTankLayoutComponent,

  isExportable: true,
};
export default FuelTankPart;
