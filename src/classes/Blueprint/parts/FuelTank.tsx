import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import * as PropertiesExplorer from 'components/PropertiesExplorer';
import usePropertyController from 'hooks/useNumberPropertyController';
import usePartProperty from 'hooks/usePartProperty';
import { createRef, FC } from 'react';
import {
  Box2,
  CylinderGeometry,
  Mesh,
  MeshStandardMaterial,
  Vector2,
} from 'three';
import { PropertyComponentProps } from 'types/Parts';
import PartWithTransformations, {
  ExportedPartWithTransformations,
} from './PartWithTransformations';

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

export interface ExportedFuelTank extends ExportedPartWithTransformations {
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

class FuelTank
  extends PartWithTransformations<ExportedFuelTank>
  implements ExportedFuelTank
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
  label = this.n;

  meshRef = createRef<Mesh>();

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

  static IconComponent = Icon;
  LayoutComponent = () => {
    console.log(this.ID);

    usePartProperty(
      this.ID,
      (state: FuelTank) => state.N,
      (N) => {
        this.meshRef.current!.geometry = new CylinderGeometry(
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

    return (
      <mesh
        ref={this.meshRef}
        material={temp_material}
        position={[0, this.N.height / 2, 0]}
      />
    );
  };
  static PropertyComponent: FC<PropertyComponentProps> = ({ IDs }) => {
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
          <PropertiesExplorer.NamedInput ref={width} label="W" />
          <PropertiesExplorer.NamedInput ref={height} label="H" />
          <PropertiesExplorer.NamedInput ref={fuel} label="F" />
        </PropertiesExplorer.Row>
      </PropertiesExplorer.Group>
    );
  };
}
export default FuelTank;

//@ts-ignore
window.lol = FuelTank;
//@ts-ignore
window.part = new lol();
