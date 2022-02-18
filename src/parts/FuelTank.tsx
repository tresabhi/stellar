import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import * as PropertiesExplorer from 'components/PropertiesExplorer';
import useSelectionHandler, {
  UseSelectionHandlerMesh,
} from 'hooks/useDesktopSelection';
import usePartDecorations from 'hooks/usePartDecorations';
import useUnitInputController from 'hooks/useUnitInputController';
import {
  getPartByAddress,
  getReactivePartByAddress,
} from 'interfaces/blueprint';
import { FC, memo, useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import { Mesh } from 'three';
import {
  PartModule,
  PropertyComponentProps,
  ReactivePartComponentProps,
} from 'types/Parts';
import compareAddressesProps from 'utilities/compareAddressesProps';
import getOnlyMutualSlice from 'utilities/getOnlyMutualSlice';
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

export const FuelTankLayoutComponent = memo<ReactivePartComponentProps>(
  ({ address }) => {
    const data = getReactivePartByAddress(address) as FuelTank;
    const initialData = getPartByAddress(
      address,
      blueprintStore.getState(),
    ) as FuelTank;
    const initialRotation = data.o.z * (Math.PI / 180);
    const meshRef = useRef<Mesh>();
    const selectionHandler = useSelectionHandler(
      address,
      'mesh',
    ) as UseSelectionHandlerMesh;

    usePartDecorations(data, meshRef);

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
        onClick={selectionHandler}
      >
        <cylinderGeometry
          ref={meshRef}
          args={[
            data.N.width_b / 2,
            data.N.width_a / 2,
            data.N.height,
            24,
            undefined,
            true,
          ]}
        />
        <meshStandardMaterial
          color="white"
          roughness={0.8}
          metalness={0.8}
          flatShading={true}
        />
        {data.meta.selected}
      </mesh>
    );
  },
  compareAddressesProps,
);

export const FuelTankIcon = Icon;

export const FuelTankPropertyComponent: FC<PropertyComponentProps> = ({
  parts,
}) => {
  const widthRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const fuelRef = useRef<HTMLInputElement>(null);

  const { width, height, fuel } = getOnlyMutualSlice(
    (data) => ({
      width: data.N.width_original,
      height: data.N.height,
      fuel: data.N.fuel_percent,
    }),
    parts as FuelTank[],
  );

  useUnitInputController(widthRef, width, {
    min: 0,
    suffix: 'm',
  });
  useUnitInputController(heightRef, height, { min: 0, suffix: 'm' });
  useUnitInputController(fuelRef, (fuel ?? 1) * 100, {
    min: 0,
    max: 100, // remove max?
    suffix: '%',
  });

  return (
    <PropertiesExplorer.Group>
      <PropertiesExplorer.Title>Fuel Tank</PropertiesExplorer.Title>
      <PropertiesExplorer.Row>
        <PropertiesExplorer.NamedInput ref={widthRef} label="W" />
        <PropertiesExplorer.NamedInput ref={heightRef} label="H" />
        <PropertiesExplorer.NamedInput ref={fuelRef} label="F" />
      </PropertiesExplorer.Row>
    </PropertiesExplorer.Group>
  );
};

const FuelTankPart: PartModule = {
  isExportable: true,

  Icon: FuelTankIcon,
  PropertyComponent: FuelTankPropertyComponent,

  LayoutComponent: FuelTankLayoutComponent,

  data: FuelTankData,
};
export default FuelTankPart;
