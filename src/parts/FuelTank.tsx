import { useHelper } from '@react-three/drei';
import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import * as PropertiesExplorer from 'components/PropertiesExplorer';
import useSelectionHandler, {
  UseMeshSelectionHandler,
} from 'hooks/useDesktopSelection';
import useUnitInputController from 'hooks/useUnitInputController';
import { getPartByAddress, setPartsByAddresses } from 'interfaces/blueprint';
import { FC, memo, useEffect, useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import { BoxHelper, CylinderGeometry, Mesh, MeshStandardMaterial } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import {
  PartModule,
  PropertyComponentProps,
  ReactivePartComponentProps,
} from 'types/Parts';
import compareAddressesProps from 'utilities/compareAddressesProps';
import getMutualSlice from 'utilities/getMutualSlice';
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
    const initialState = getPartByAddress(address) as FuelTank;
    const meshRef = useRef<Mesh>();
    const meshStandardMaterialRef = useRef<MeshStandardMaterial>(null);
    const helper = useHelper(meshRef, BoxHelper, 'rgb(150, 0, 255)');
    const selectionHandler = useSelectionHandler(
      address,
      'mesh',
    ) as UseMeshSelectionHandler;

    useEffect(() => {
      const changeState = (state: FuelTank) => {
        meshRef.current!.geometry = new CylinderGeometry(
          state.N.width_b / 2,
          state.N.width_a / 2,
          state.N.height,
          24,
          undefined,
          true,
        );
        meshRef.current?.scale.set(state.o.x, state.o.y, 1);
        meshRef.current?.rotation.set(0, 0, degToRad(state.o.z));
        meshRef.current?.position.set(
          state.p.x,
          state.p.y + state.N.height / 2,
          0,
        );
        helper.current!.visible = state.meta.selected;
      };

      changeState(initialState);

      blueprintStore.subscribe(
        (state) => getPartByAddress(address, state) as FuelTank,
        changeState,
      );
    }, [address, initialState, helper]);

    return (
      <mesh
        ref={meshRef}
        scale={[initialState.o.x, initialState.o.y, 1]}
        rotation={[0, 0, degToRad(initialState.o.z)]}
        position={[
          initialState.p.x,
          initialState.p.y + initialState.N.height / 2,
          0,
        ]}
        onClick={selectionHandler}
      >
        <cylinderGeometry
          args={[
            initialState.N.width_b / 2,
            initialState.N.width_a / 2,
            initialState.N.height,
            24,
            undefined,
            true,
          ]}
        />
        <meshStandardMaterial
          ref={meshStandardMaterialRef}
          color="white"
          roughness={0.8}
          metalness={0.8}
          flatShading={true}
        />
        {initialState.meta.selected}
      </mesh>
    );
  },
  compareAddressesProps,
);

export const FuelTankIcon = Icon;

export const FuelTankPropertyComponent: FC<PropertyComponentProps> = ({
  addresses,
}) => {
  const widthRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const fuelRef = useRef<HTMLInputElement>(null);

  const { width, height, fuel } = getMutualSlice(
    (data) => ({
      width: data.N.width_original,
      height: data.N.height,
      fuel: data.N.fuel_percent,
    }),
    addresses.map((address) => getPartByAddress(address) as FuelTank),
  );

  useUnitInputController(widthRef, width, {
    min: 0,
    suffix: 'm',
    onChange: (value) =>
      // TODO: separate these
      setPartsByAddresses(addresses, {
        N: { width_original: value, width_a: value, width_b: value },
      }),
  });
  useUnitInputController(heightRef, height, {
    min: 0,
    suffix: 'm',
    onChange: (value) =>
      setPartsByAddresses(addresses, { N: { height: value } }),
  });
  useUnitInputController(fuelRef, (fuel ?? 1) * 100, {
    min: 0,
    max: 100, // remove max?
    suffix: '%',
    onChange: (value) =>
      setPartsByAddresses(addresses, { N: { fuel_percent: value / 100 } }),
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
