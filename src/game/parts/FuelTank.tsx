import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import * as Properties from 'components/Properties';
import { declareBoundNeedsUpdate, deferUpdates } from 'core/bounds';
import { getPart } from 'core/part';
import PartCategory from 'hooks/constants/partCategory';
import {
  useNumericalInputProperty,
  useSliderProperty,
} from 'hooks/propertyControllers';
import usePartProperty from 'hooks/usePartProperty';
import usePhysicalPart from 'hooks/usePhysicalPart';
import { useTranslator } from 'hooks/useTranslator';
import { FC, useRef } from 'react';
import { PartRegistryFragment } from 'stores/usePartRegistry';
import { CylinderGeometry, Group, Mesh } from 'three';
import { PartComponentProps, PartPropertyComponentProps } from 'types/Parts';
import { Part, PartData } from './Part';
import {
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

export const FuelTankLayoutComponent: FC<PartComponentProps> = ({ id }) => {
  const wrapper = useRef<Group>(null!);
  const mesh = useRef<Mesh>(null!);
  const state = getPart<FuelTank>(id)!;
  const { props } = usePhysicalPart(id, wrapper, mesh);

  usePartProperty(
    id,
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
      mesh.current.position.set(0, N.height / 2, 0);
      // TODO: maybe merge these two functions?
      declareBoundNeedsUpdate(id);
      deferUpdates();
    },
  );

  return (
    <group ref={wrapper} position={[state.p.x, state.p.y, 0]} {...props}>
      <mesh ref={mesh}>
        <meshStandardMaterial
          flatShading
          roughness={0.8}
          metalness={0.8}
          color="white"
        />
      </mesh>
    </group>
  );
};

export const FuelTankPropertyComponent: FC<PartPropertyComponentProps> = ({
  ids,
}) => {
  const { t } = useTranslator();
  const topWidth = useNumericalInputProperty<FuelTank>(
    ids,
    (state) => state.N.width_b,
    (draft, value) => {
      draft.N.width_b = value;
    },
  );
  const bottomWidth = useNumericalInputProperty<FuelTank>(
    ids,
    (state) => state.N.width_a,
    (draft, value) => {
      draft.N.width_a = value;
      draft.N.width_original = value;
    },
  );
  const height = useNumericalInputProperty<FuelTank>(
    ids,
    (state) => state.N.height,
    (draft, value) => {
      draft.N.height = value;
    },
  );
  const fuel = useSliderProperty<FuelTank>(
    ids,
    (state) => state.N.fuel_percent * 100,
    (draft, value) => {
      draft.N.fuel_percent = value / 100;
    },
  );

  return (
    <Properties.Group>
      <Properties.Title>{t`tab.layout.right_sidebar.properties.fuel_tank`}</Properties.Title>
      <Properties.Row>
        <Properties.Input
          {...topWidth}
          label={t`tab.layout.right_sidebar.properties.fuel_tank.top_width`}
          unit="m"
        />
        <Properties.Input
          {...bottomWidth}
          label={t`tab.layout.right_sidebar.properties.fuel_tank.bottom_width`}
          unit="m"
        />
        <Properties.Input
          {...height}
          label={t`tab.layout.right_sidebar.properties.fuel_tank.height`}
          unit="m"
        />
      </Properties.Row>

      <Properties.Row>
        <Properties.SliderWithInput
          {...fuel}
          label={t`tab.layout.right_sidebar.properties.fuel_tank.fuel`}
          unit="%"
          min={0}
          max={100}
        />
      </Properties.Row>
    </Properties.Group>
  );
};

export const FuelTankIcon = Icon;

export const FuelTankRegistry: PartRegistryFragment = [
  'Fuel Tank',
  {
    category: PartCategory.Structural,

    vanillaData: VanillaFuelTankData,
    data: FuelTankData,

    Icon: FuelTankIcon,
    PropertyEditor: FuelTankPropertyComponent,
    Mesh: FuelTankLayoutComponent,
  },
];
