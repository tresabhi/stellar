import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import { getPartByAddress } from 'interfaces/blueprint';
import { times } from 'lodash';
import { memo, useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import { Euler, Group, Mesh } from 'three';
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

export const FuelTankLayoutComponent = memo<PartComponentProps>(
  ({ address }) => {
    const initialState = getPartByAddress(
      address,
      blueprintStore.getState(),
    ) as FuelTank;
    const initialRotation = initialState.o.z * (Math.PI / 180);
    const meshRef = useRef<Mesh | Group>(null);

    blueprintStore.subscribe(
      (state) => (getPartByAddress(address, state) as PartWithTranslations).p.x,
      (current, previous) => {
        meshRef.current!.position.x += current - previous;
      },
    );
    blueprintStore.subscribe(
      (state) => (getPartByAddress(address, state) as PartWithTranslations).p.y,
      (current, previous) => {
        meshRef.current!.position.y += current - previous;
      },
    );
    blueprintStore.subscribe(
      (state) => (getPartByAddress(address, state) as PartWithTranslations).o.x,
      (current, previous) => {
        meshRef.current!.scale.x += current - previous;
      },
    );
    blueprintStore.subscribe(
      (state) => (getPartByAddress(address, state) as PartWithTranslations).o.y,
      (current, previous) => {
        meshRef.current!.scale.y += current - previous;
      },
    );
    blueprintStore.subscribe(
      (state) => (getPartByAddress(address, state) as PartWithTranslations).o.z,
      (current) => {
        meshRef.current!.setRotationFromEuler(new Euler(0, 0, current));
      },
    );

    switch (initialState.T.shape_tex) {
      case 'Rivets': {
        const rivets = times(RIVET_COUNT, (index) => (
          <mesh
            ref={meshRef}
            key={`rivet-${index}`}
            rotation={[0, (index / RIVET_COUNT) * 90 * (Math.PI / 180), 0]}
          >
            <cylinderGeometry
              args={[
                initialState.N.width_b / 2,
                initialState.N.width_a / 2,
                initialState.N.height,
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
            scale={[initialState.o.x, initialState.o.y, 1]}
            rotation={[0, 0, initialRotation]}
            position={[
              initialState.p.x,
              initialState.p.y + initialState.N.height / 2,
              0,
            ]}
          >
            <mesh>
              <cylinderGeometry
                args={[
                  Math.max(0, initialState.N.width_b / 2 - RIVET_MARGIN),
                  Math.max(0, initialState.N.width_a / 2 - RIVET_MARGIN),
                  initialState.N.height,
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
            position={[0, initialState.N.height / -4, 0]}
          >
            <cylinderGeometry
              args={[
                (initialState.N.width_b + initialState.N.width_a) / 4,
                initialState.N.width_a / 2,
                initialState.N.height / 2,
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
            scale={[initialState.o.x, initialState.o.y, 1]}
            rotation={[0, 0, initialRotation]}
            position={[
              initialState.p.x,
              initialState.p.y + initialState.N.height / 2,
              0,
            ]}
          >
            <mesh position={[0, initialState.N.height / -4, 0]}>
              <cylinderGeometry
                args={[
                  Math.max(
                    0,
                    (initialState.N.width_b + initialState.N.width_a) / 4 -
                      RIVET_MARGIN,
                  ),
                  Math.max(0, initialState.N.width_a / 2 - RIVET_MARGIN),
                  initialState.N.height / 2,
                  FACE_COUNT,
                  undefined,
                  true,
                ]}
              />
              {MATERIALS.faces}
            </mesh>
            <mesh position={[0, initialState.N.height / 4, 0]}>
              <cylinderGeometry
                args={[
                  initialState.N.width_b / 2,
                  (initialState.N.width_b + initialState.N.width_a) / 4,
                  initialState.N.height / 2,
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
            scale={[initialState.o.x, initialState.o.y, 1]}
            rotation={[0, 0, initialRotation]}
            position={[
              initialState.p.x,
              initialState.p.y + initialState.N.height / 2,
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                initialState.N.width_b / 2,
                initialState.N.width_a / 2,
                initialState.N.height,
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
                initialState.N.width_b / 2,
                initialState.N.width_a / 2,
                initialState.N.height,
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
            scale={[initialState.o.x, initialState.o.y, 1]}
            rotation={[0, 0, initialRotation]}
            position={[
              initialState.p.x,
              initialState.p.y + initialState.N.height / 2,
              0,
            ]}
          >
            <mesh>
              <cylinderGeometry
                args={[
                  Math.max(0, initialState.N.width_b / 2 - RIVET_MARGIN),
                  Math.max(0, initialState.N.width_a / 2 - RIVET_MARGIN),
                  initialState.N.height,
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
                  initialState.N.height,
                  initialState.N.height - RIM_HEIGHT,
                ) / 2,
                0,
              ]}
            >
              <cylinderGeometry
                args={[
                  initialState.N.width_b / 2,
                  lerp(
                    initialState.N.width_b,
                    initialState.N.width_a,
                    RIM_HEIGHT / initialState.N.height / 1,
                  ) / 2,
                  Math.min(initialState.N.height, RIM_HEIGHT),
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
                  initialState.N.height,
                  initialState.N.height - RIM_SLOPE_HEIGHT,
                ) /
                  2 -
                  RIM_HEIGHT,
                0,
              ]}
            >
              <cylinderGeometry
                args={[
                  lerp(
                    initialState.N.width_b,
                    initialState.N.width_a,
                    RIM_HEIGHT / initialState.N.height / 1,
                  ) / 2,
                  Math.max(
                    0,
                    lerp(
                      initialState.N.width_b,
                      initialState.N.width_a,
                      (RIM_HEIGHT + RIM_SLOPE_HEIGHT) /
                        initialState.N.height /
                        1,
                    ) /
                      2 -
                      RIVET_MARGIN,
                  ),
                  Math.min(initialState.N.height, RIM_SLOPE_HEIGHT),
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
                initialState.N.width_b / 2,
                initialState.N.width_a / 2,
                initialState.N.height,
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
            scale={[initialState.o.x, initialState.o.y, 1]}
            rotation={[0, 0, initialRotation]}
            position={[
              initialState.p.x,
              initialState.p.y + initialState.N.height / 2,
              0,
            ]}
          >
            <mesh>
              <cylinderGeometry
                args={[
                  Math.max(0, initialState.N.width_b / 2 - RIVET_MARGIN),
                  Math.max(0, initialState.N.width_a / 2 - RIVET_MARGIN),
                  initialState.N.height,
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
                  initialState.N.height,
                  initialState.N.height - RIM_HEIGHT,
                ) / 2,
                0,
              ]}
            >
              <cylinderGeometry
                args={[
                  initialState.N.width_b / 2,
                  lerp(
                    initialState.N.width_b,
                    initialState.N.width_a,
                    RIM_HEIGHT / initialState.N.height / 1,
                  ) / 2,
                  Math.min(initialState.N.height, RIM_HEIGHT),
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
                  initialState.N.height,
                  initialState.N.height - RIM_SLOPE_HEIGHT,
                ) /
                  2 -
                  RIM_HEIGHT,
                0,
              ]}
            >
              <cylinderGeometry
                args={[
                  lerp(
                    initialState.N.width_b,
                    initialState.N.width_a,
                    RIM_HEIGHT / initialState.N.height / 1,
                  ) / 2,
                  Math.max(
                    0,
                    lerp(
                      initialState.N.width_b,
                      initialState.N.width_a,
                      (RIM_HEIGHT + RIM_SLOPE_HEIGHT) /
                        initialState.N.height /
                        1,
                    ) /
                      2 -
                      RIVET_MARGIN,
                  ),
                  Math.min(initialState.N.height, RIM_SLOPE_HEIGHT),
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
                  initialState.N.height,
                  initialState.N.height - RIM_HEIGHT,
                ) / -2,
                0,
              ]}
            >
              <cylinderGeometry
                args={[
                  lerp(
                    initialState.N.width_a,
                    initialState.N.width_b,
                    RIM_HEIGHT / initialState.N.height / 1,
                  ) / 2,
                  initialState.N.width_a / 2,
                  Math.min(initialState.N.height, RIM_HEIGHT),
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
                  initialState.N.height,
                  initialState.N.height - RIM_SLOPE_HEIGHT,
                ) /
                  -2 +
                  RIM_HEIGHT,
                0,
              ]}
            >
              <cylinderGeometry
                args={[
                  Math.max(
                    0,
                    lerp(
                      initialState.N.width_a,
                      initialState.N.width_b,
                      (RIM_HEIGHT + RIM_SLOPE_HEIGHT) /
                        initialState.N.height /
                        1,
                    ) /
                      2 -
                      RIVET_MARGIN,
                  ),
                  lerp(
                    initialState.N.width_a,
                    initialState.N.width_b,
                    RIM_HEIGHT / initialState.N.height / 1,
                  ) / 2,
                  Math.min(initialState.N.height, RIM_SLOPE_HEIGHT),
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
        const nozzleCount = Math.floor(
          initialState.N.height * NOZZLES_PER_METER,
        );
        const nozzles = times(nozzleCount, (index) => (
          <group
            key={`nozzle-${index}`}
            position={[
              0,
              (index / nozzleCount) * initialState.N.height -
                initialState.N.height / 2 +
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
                      initialState.N.width_a,
                      initialState.N.width_b,
                      index / nozzleCount +
                        (NOZZLE_HEIGHT / 2 + NOZZLE_OFFSET) /
                          initialState.N.height,
                    ) /
                      2 -
                      RIVET_MARGIN,
                  ),
                  lerp(
                    initialState.N.width_a,
                    initialState.N.width_b,
                    index / nozzleCount + NOZZLE_OFFSET / initialState.N.height,
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
                    initialState.N.width_a,
                    initialState.N.width_b,
                    index / nozzleCount + NOZZLE_OFFSET / initialState.N.height,
                  ) / 2,
                  Math.max(
                    0,
                    lerp(
                      initialState.N.width_a,
                      initialState.N.width_b,
                      index / nozzleCount -
                        (NOZZLE_HEIGHT / 2 - NOZZLE_OFFSET) /
                          initialState.N.height,
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
            scale={[initialState.o.x, initialState.o.y, 1]}
            rotation={[0, 0, initialRotation]}
            position={[
              initialState.p.x,
              initialState.p.y + initialState.N.height / 2,
              0,
            ]}
          >
            <mesh>
              <cylinderGeometry
                args={[
                  Math.max(0, initialState.N.width_b / 2 - RIVET_MARGIN),
                  Math.max(0, initialState.N.width_a / 2 - RIVET_MARGIN),
                  initialState.N.height,
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
       * implement low poly parts (which are going to be closer to what's
       * in-game) and it's going to replace this hi-poly crap
       */
      default:
      case '_':
      case 'Strut':
      case 'Edges Faces': {
        return (
          <group
            scale={[initialState.o.x, initialState.o.y, 1]}
            position={[
              initialState.p.x,
              initialState.p.y + initialState.N.height / 2,
              0,
            ]}
            rotation={[0, 0, initialRotation]}
          >
            <mesh>
              <cylinderGeometry
                args={[
                  initialState.N.width_b / 2,
                  initialState.N.width_a / 2,
                  Math.max(0, initialState.N.height - BEVEL_MARGIN * 2),
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
                Math.max(
                  initialState.N.height / 4,
                  (initialState.N.height - BEVEL_MARGIN) / 2,
                ),
                0,
              ]}
            >
              <cylinderGeometry
                args={[
                  Math.max(0, initialState.N.width_b / 2 - BEVEL_MARGIN),
                  initialState.N.width_b / 2,
                  Math.min(BEVEL_MARGIN, initialState.N.height / 2),
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
                  initialState.N.height / -4,
                  (initialState.N.height - BEVEL_MARGIN) / -2,
                ),
                0,
              ]}
            >
              <cylinderGeometry
                args={[
                  initialState.N.width_a / 2,
                  Math.max(0, initialState.N.width_a / 2 - BEVEL_MARGIN),
                  Math.min(BEVEL_MARGIN, initialState.N.height / 2),
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
            scale={[initialState.o.x, initialState.o.y, 1]}
            position={[
              initialState.p.x,
              initialState.p.y + initialState.N.height / 2,
              0,
            ]}
            rotation={[0, 0, initialRotation]}
          >
            <mesh>
              <cylinderGeometry
                args={[
                  initialState.N.width_b / 2,
                  initialState.N.width_a / 2,
                  Math.max(0, initialState.N.height - BEVEL_MARGIN * 2),
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
                Math.max(
                  initialState.N.height / 4,
                  (initialState.N.height - BEVEL_MARGIN) / 2,
                ),
                0,
              ]}
            >
              <cylinderGeometry
                args={[
                  Math.max(0, initialState.N.width_b / 2 - BEVEL_MARGIN),
                  initialState.N.width_b / 2,
                  Math.min(BEVEL_MARGIN, initialState.N.height / 2),
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
                  initialState.N.height / -4,
                  (initialState.N.height - BEVEL_MARGIN) / -2,
                ),
                0,
              ]}
            >
              <cylinderGeometry
                args={[
                  initialState.N.width_a / 2,
                  Math.max(0, initialState.N.width_a / 2 - BEVEL_MARGIN),
                  Math.min(BEVEL_MARGIN, initialState.N.height / 2),
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
            scale={[initialState.o.x, initialState.o.y, 1]}
            rotation={[0, 0, initialRotation]}
            position={[
              initialState.p.x,
              initialState.p.y + initialState.N.height / 2,
              0,
            ]}
          >
            <cylinderGeometry
              args={[
                initialState.N.width_b / 2,
                initialState.N.width_a / 2,
                initialState.N.height,
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
