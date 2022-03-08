import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import * as PropertiesExplorer from 'components/PropertiesExplorer';
import usePartMeta from 'hooks/usePartMeta';
import usePartProperty from 'hooks/usePartProperty';
import usePartTransformations from 'hooks/usePartTransformations';
import usePartTranslationControls from 'hooks/usePartTranslationControls';
import usePropertyController from 'hooks/usePropertyController';
import useSelectionHandler, {
  UseMeshSelectionHandler,
} from 'hooks/useSelectionHandler';
import { getPart } from 'interfaces/blueprint';
import { FC, memo, useRef } from 'react';
import { CylinderGeometry, Mesh, MeshStandardMaterial } from 'three';
import {
  PartModule,
  PropertyComponentProps,
  ReactivePartComponentProps,
} from 'types/Parts';
import compareIDProps from 'utilities/compareIDProps';
import {
  DefaultPartData,
  PartWithMeta,
  PartWithTransformations,
} from './Default';

export interface VanillaFuelTank extends PartWithTransformations {
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

export interface FuelTank extends VanillaFuelTank, PartWithMeta {}

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

const temp_material = new MeshStandardMaterial({
  color: 'white',
  roughness: 0.8,
  metalness: 0.8,
  flatShading: true,
});

export const FuelTankLayoutComponent = memo<ReactivePartComponentProps>(
  ({ ID }) => {
    const initialState = getPart(ID) as FuelTank;
    const mesh = useRef<Mesh>(null!);
    const selectionHandler = useSelectionHandler(
      ID,
      'mesh',
    ) as UseMeshSelectionHandler;

    usePartTransformations(ID, mesh, (state) => ({
      p: { y: state.p.y + (state as FuelTank).N.height / 2 },
    }));
    usePartMeta(ID, mesh);
    usePartProperty(
      ID,
      (state: FuelTank) => state.N,
      (N) => {
        mesh.current.geometry = new CylinderGeometry(
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
    const onPointerDown = usePartTranslationControls(ID);

    return (
      <mesh
        ref={mesh}
        material={temp_material}
        position={[0, initialState.N.height / 2, 0]}
        onClick={selectionHandler}
        onPointerDown={onPointerDown}
      />
    );
  },
  compareIDProps,
);

export const FuelTankIcon = Icon;

export const FuelTankPropertyComponent: FC<PropertyComponentProps> = ({
  IDs,
}) => {
  const width = usePropertyController<FuelTank>(
    IDs,
    (state) => state.N.width_original,
    (value) => ({
      N: { width_original: value, width_a: value, width_b: value },
    }),
    { min: 0, suffix: 'm' },
  );
  const height = usePropertyController<FuelTank>(
    IDs,
    (state) => state.N.height,
    (value) => ({ N: { height: value } }),
    { min: 0, suffix: 'm' },
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
        <PropertiesExplorer.NamedInput ref={width} label="W" />
        <PropertiesExplorer.NamedInput ref={height} label="H" />
        <PropertiesExplorer.NamedInput ref={fuel} label="F" />
      </PropertiesExplorer.Row>
    </PropertiesExplorer.Group>
  );
};

const FuelTankPart: PartModule = {
  hasTransformations: true,
  isExportable: true,
  data: FuelTankData,
  Icon: FuelTankIcon,
  PropertyComponent: FuelTankPropertyComponent,
  LayoutComponent: FuelTankLayoutComponent,
};
export default FuelTankPart;
