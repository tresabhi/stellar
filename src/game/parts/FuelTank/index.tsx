import { Link1Icon, LinkNone1Icon } from '@radix-ui/react-icons';
import { invalidate } from '@react-three/fiber';
import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import * as Properties from 'components/Properties';
import mutateSettings from 'core/app/mutateSettings';
import declareBoundsUpdated from 'core/bounds/declareBoundsUpdated';
import getPart from 'core/part/getPart';
import PartCategory from 'hooks/constants/partCategory';
import useNumericalInputProperty from 'hooks/propertyControllers/useNumericalInputProperty';
import useSliderProperty from 'hooks/propertyControllers/useSliderProperty';
import usePhysicalPart from 'hooks/usePartPhysical';
import usePartProperty from 'hooks/usePartProperty';
import useTranslator from 'hooks/useTranslator';
import { useRef } from 'react';
import boundsStore from 'stores/bounds';
import { PartRegistryItem } from 'stores/partRegistry';
import useSettings from 'stores/settings';
import { CylinderGeometry, Group, Mesh } from 'three';
import { PartComponentProps, PartPropertyComponentProps } from 'types/Parts';
import { PartData, PartWithoutName } from '../Part';
import {
  VanillaPartWithTexture,
  VanillaPartWithTextureData,
} from '../PartWithTexture';
import {
  VanillaPartWithTransformations,
  VanillaPartWithTransformationsData,
} from '../PartWithTransformations';

export interface VanillaFuelTank
  extends VanillaPartWithTexture,
    VanillaPartWithTransformations {
  readonly n: 'Fuel Tank';
  N: {
    width_original: number;
    width_a: number;
    width_b: number;
    height: number;
    fuel_percent: number;
  };
}

export interface FuelTank extends PartWithoutName, VanillaFuelTank {}

export const VanillaFuelTankData: VanillaFuelTank = {
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithTextureData,

  n: 'Fuel Tank',
  N: {
    width_original: 1,
    width_a: 1,
    width_b: 1,
    height: 1,
    fuel_percent: 1,
  },
};

export const FuelTankData: FuelTank = {
  ...PartData,
  ...VanillaFuelTankData,

  label: 'Fuel Tank',
};

export default function FuelTankLayoutComponent({ id }: PartComponentProps) {
  const wrapper = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);
  const props = usePhysicalPart(id, wrapper);

  usePartProperty(
    id,
    (newState: FuelTank) => newState.N,
    (N) => {
      if (mesh.current) {
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

        if (boundsStore[id] && wrapper.current) {
          const { o } = getPart<FuelTank>(id);
          const { bounds } = boundsStore[id];
          const width = Math.max(N.width_a, N.width_b) * o.x;
          const height = N.height * o.y;
          const offset = height / 2;
          const offsetRotation = wrapper.current.rotation.z + Math.PI / 2;
          const offsetX = offset * Math.cos(offsetRotation);
          const offsetY = offset * Math.sin(offsetRotation);
          const x = wrapper.current.position.x + offsetX;
          const y = wrapper.current.position.y + offsetY;

          bounds.x = x;
          bounds.y = y;
          bounds.width = width;
          bounds.height = height;

          declareBoundsUpdated(id);
        }

        invalidate();
      }
    },
  );

  return (
    <group ref={wrapper} {...props}>
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
}

export function FuelTankProperties({ ids }: PartPropertyComponentProps) {
  const { t } = useTranslator();
  const constrain = useSettings(
    (state) => state.editor.constrainFuelTankWidths,
  );
  const topWidth = useNumericalInputProperty<FuelTank>(
    ids,
    (state) => state.N.width_b,
    (draft, newValue, lastValue) => {
      draft.N.width_b = newValue;

      if (constrain && lastValue !== undefined && lastValue !== 0) {
        draft.N.width_a *= newValue / lastValue;
        draft.N.width_original *= newValue / lastValue;
      }
    },
  );
  const bottomWidth = useNumericalInputProperty<FuelTank>(
    ids,
    (state) => state.N.width_a,
    (draft, newValue, lastValue) => {
      draft.N.width_a = newValue;
      draft.N.width_original = newValue;

      if (constrain && lastValue !== undefined && lastValue !== 0) {
        draft.N.width_b *= newValue / lastValue;
      }
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

  const handleConstrainClick = () => {
    mutateSettings((draft) => {
      draft.editor.constrainFuelTankWidths =
        !draft.editor.constrainFuelTankWidths;
    });
  };

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.fuel_tank`}</Properties.Title>

      <Properties.Row>
        <Properties.Input
          {...height}
          label={t`tabs.layout.right_sidebar.properties.fuel_tank.height`}
          unit="m"
        />
      </Properties.Row>

      <Properties.Row>
        <Properties.Input
          {...topWidth}
          label={t`tabs.layout.right_sidebar.properties.fuel_tank.top_width`}
          unit="m"
        />
        <Properties.Input
          {...bottomWidth}
          label={t`tabs.layout.right_sidebar.properties.fuel_tank.bottom_width`}
          unit="m"
        />
        <Properties.ToggleButton
          label={t`tabs.layout.right_sidebar.properties.fuel_tank.constrain`}
          hint={t`tabs.layout.right_sidebar.properties.fuel_tank.constrain.hint`}
          onClick={handleConstrainClick}
          selected={constrain}
        >
          {constrain ? <Link1Icon /> : <LinkNone1Icon />}
        </Properties.ToggleButton>
      </Properties.Row>

      <Properties.Row>
        <Properties.SliderWithInput
          {...fuel}
          label={t`tabs.layout.right_sidebar.properties.fuel_tank.fuel`}
          unit="%"
          min={0}
          max={100}
        />
      </Properties.Row>
    </Properties.Group>
  );
}

export const FuelTankIcon = Icon;

export const registry: PartRegistryItem<FuelTank> = {
  category: PartCategory.Structural,
  vanillaData: VanillaFuelTankData,
  data: FuelTankData,

  Icon: FuelTankIcon,
  Mesh: FuelTankLayoutComponent,

  exportify: undefined,
};
