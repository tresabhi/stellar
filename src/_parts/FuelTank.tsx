import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import { FC } from 'react';
import { Box2, Vector2 } from 'three';
import {
  PropertyComponentProps,
  ReactivePartComponentProps,
} from 'types/Parts';
import PartWithTransformations from './PartWithTransformations';

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

export interface FuelTankData {
  n: 'Fuel Tank';
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

class FuelTank
  extends PartWithTransformations<FuelTankData>
  implements FuelTankData
{
  readonly n = 'Fuel Tank';
  N = {
    width_original: 1,
    width_a: 1,
    width_b: 1,
    height: 1,
    fuel_percent: 1,
  };
  T = {
    color_tex: '_' as ColorTexture,
    shape_tex: '_' as ShapeTexture,
  };

  Icon = Icon;

  LayoutComponent: FC<ReactivePartComponentProps> = () => null;
  PropertyComponent: FC<PropertyComponentProps> = () => null;

  updateBoundingBox() {
    this.boundingBox = new Box2(
      new Vector2(
        this.p.x - (Math.max(this.N.width_a, this.N.width_b) / 2) * this.o.x,
        this.p.y,
      ),
      new Vector2(
        this.p.x + (Math.max(this.N.width_a, this.N.width_b) / 2) * this.o.y,
        this.p.y + this.N.height * this.o.y,
      ),
    );
  }

  constructor() {
    super();
    this.updateBoundingBox();
  }
}
export default FuelTank;
