import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import * as PropertiesExplorer from 'components/PropertiesExplorer';
import { getPart } from 'core/part';
import useDragControls from 'hooks/useDragControls';
import usePartProperty from 'hooks/usePartProperty';
import usePartWithBoundingBox from 'hooks/usePartWithBoundingBox';
import usePropertyController from 'hooks/usePropertyController';
import useSelectionControl from 'hooks/useSelectionControl';
import { FC, useRef } from 'react';
import { CylinderGeometry, Group, Mesh, MeshStandardMaterial } from 'three';
import { PartComponentProps, PartPropertyComponentProps } from 'types/Parts';
import { Part, PartData } from './Part';
import {
  usePartWithTransformations,
  VanillaPartWithTransformations,
  VanillaPartWithTransformationsData,
} from './PartWithTransformations';

// #region texture types
type ColorTexture =
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

type ShapeTexture =
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
// #endregion

export interface VanillaFuelTank extends VanillaPartWithTransformations {
  readonly n: 'Fuel Tank';
  N: {
    width_original: number;
    width_a: number;
    width_b: number;
    height: number;
    fuel_percent: number;
  };
  T: {
    color_tex: ColorTexture;
    shape_tex: ShapeTexture;
  };
}

export interface FuelTank extends Omit<Part, 'n'>, VanillaFuelTank {}

export const VanillaFuelTankData: VanillaFuelTank = {
  ...VanillaPartWithTransformationsData,

  n: 'Fuel Tank',
  N: {
    width_original: 1,
    width_a: 1,
    width_b: 1,
    height: 1,
    fuel_percent: 1,
  },
  T: {
    color_tex: '_',
    shape_tex: '_',
  },
};

export const FuelTankData: FuelTank = {
  ...PartData,
  ...VanillaFuelTankData,

  label: 'Fuel Tank',
};

/**
 * TODO: Make this data driven later!
 * @deprecated
 */
const temp_material = new MeshStandardMaterial({
  color: 'white',
  roughness: 0.8,
  metalness: 0.8,
  flatShading: true,
});

export const FuelTankLayoutComponent: FC<PartComponentProps> = ({ ID }) => {
  const group = useRef<Group>(null!);
  const mesh = useRef<Mesh>(null!);
  const state = getPart<FuelTank>(ID)!;

  const handleClick = useSelectionControl(ID);
  const handlePointerDown = useDragControls<FuelTank>(ID);
  usePartProperty(
    ID,
    (state: FuelTank) => state.N,
    (N) => {
      mesh.current!.geometry = new CylinderGeometry(
        N.width_b / 2,
        N.width_a / 2,
        N.height,
        12,
        1,
        true,
        Math.PI / -2,
        Math.PI,
      );
    },
  );
  usePartWithTransformations(ID, group);
  usePartWithBoundingBox(ID, mesh);

  return (
    <group
      ref={group}
      position={[state.p.x, state.p.y, 0]}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
    >
      <mesh
        ref={mesh}
        material={temp_material}
        position={[0, state.N.height / 2, 0]}
      />
    </group>
  );
};

export const FuelTankPropertyComponent: FC<PartPropertyComponentProps> = ({
  IDs,
}) => {
  const width = usePropertyController<FuelTank>(
    IDs,
    (state) => state.N.width_original,
    (value) => ({
      N: { width_original: value, width_a: value, width_b: value },
    }),
    { suffix: 'm' },
  );
  const height = usePropertyController<FuelTank>(
    IDs,
    (state) => state.N.height,
    (value) => ({ N: { height: value } }),
    { suffix: 'm' },
  );
  const fuel = usePropertyController<FuelTank>(
    IDs,
    (state) => state.N.fuel_percent * 100,
    (value) => ({ N: { fuel_percent: value / 100 } }),
    { min: 0, max: 100, suffix: '%' },
  );

  return (
    <PropertiesExplorer.Group>
      <PropertiesExplorer.Title>Fuel Tank</PropertiesExplorer.Title>
      <PropertiesExplorer.Row>
        <PropertiesExplorer.Input ref={width} label="Width" />
        <PropertiesExplorer.Input ref={height} label="Height" />
        <PropertiesExplorer.Input ref={fuel} label="Fuel" />
      </PropertiesExplorer.Row>
    </PropertiesExplorer.Group>
  );
};

export const FuelTankIcon = Icon;
