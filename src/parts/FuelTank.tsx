import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import usePartDecorations from 'hooks/usePartDecorations';
import useSelectionHandler from 'hooks/useSelectionHandler';
import {
  getPartByAddress,
  getReactivePartByAddress,
} from 'interfaces/blueprint';
import { memo, useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import { Mesh } from 'three';
import { PartComponentProps, PartModule } from 'types/Parts';
import compareAddressProps from 'utilities/compareAddressProps';
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

export const FuelTankLayoutComponent = memo<PartComponentProps>(
  ({ address }) => {
    const data = getReactivePartByAddress(address) as FuelTank;
    const initialData = getPartByAddress(
      address,
      blueprintStore.getState(),
    ) as FuelTank;
    const initialRotation = data.o.z * (Math.PI / 180);
    const meshRef = useRef<Mesh>();
    const selectionHandler = useSelectionHandler(address);

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
