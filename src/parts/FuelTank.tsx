import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import { PartModule } from 'types/Parts';
import { memo } from 'react';
import { DefaultPart } from './Default';

export interface FuelTank extends DefaultPart {
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

export const FuelTankLayoutComponent = memo(() => <mesh />);

export const FuelTankIcon = Icon;

const FuelTank: PartModule = {
  data: FuelTankData,

  Icon: FuelTankIcon,
  LayoutComponent: FuelTankLayoutComponent,

  isExportable: true,
};
export default FuelTank;
