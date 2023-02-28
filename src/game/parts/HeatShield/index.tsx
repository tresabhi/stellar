import { useGLTF } from '@react-three/drei';
import { invalidate } from '@react-three/fiber';
import { ReactComponent as HeatShieldIcon } from 'assets/icons/heat-shield.svg';
import * as Properties from 'components/Properties';
import declareBoundsUpdated from 'core/bounds/declareBoundsUpdated';
import getPart from 'core/part/getPart';
import PartCategory from 'hooks/constants/partCategory';
import useNumericalInputProperty from 'hooks/propertyControllers/useNumericalInputProperty';
import useModel from 'hooks/useModel';
import usePhysicalPart from 'hooks/usePartPhysical';
import usePartProperty from 'hooks/usePartProperty';
import useTranslator from 'hooks/useTranslator';
import { useRef } from 'react';
import boundsStore from 'stores/bounds';
import { PartRegistryItem } from 'stores/partRegistry';
import { Group } from 'three';
import { PartComponentProps, PartPropertyComponentProps } from 'types/Parts';
import { PartData, PartWithoutName } from '../Part';
import {
  VanillaPartWithTransformations,
  VanillaPartWithTransformationsData,
} from '../PartWithTransformations';
import model from './model.gltf';

export interface VanillaHeatShield extends VanillaPartWithTransformations {
  readonly n: 'Heat Shield';

  N: {
    width_original: number;
    width: number;
    shield_temp: '-Infinity';
  };
}

export interface HeatShield extends PartWithoutName, VanillaHeatShield {}

export const VanillaHeatShieldData: VanillaHeatShield = {
  ...VanillaPartWithTransformationsData,

  n: 'Heat Shield',

  N: {
    width_original: 2,
    width: 2,
    shield_temp: '-Infinity',
  },
};

export const HeatShieldData: HeatShield = {
  ...PartData,
  ...VanillaHeatShieldData,

  label: 'Heat Shield',
};

useGLTF.preload(model);
export function HeatShieldLayoutComponent({ id }: PartComponentProps) {
  const wrapper = useRef<Group>(null);
  const widthWrapper = useRef<Group>(null);
  const props = usePhysicalPart(id, wrapper);
  const meshes = useModel(model);
  const firstRun = useRef(true);

  usePartProperty(
    id,
    (state: HeatShield) => state.N.width,
    (width, lastWidth) => {
      const part = getPart<HeatShield>(id);
      const trueLastWidth = firstRun.current ? 1 : lastWidth;
      widthWrapper.current?.scale.set(width, width, 1);

      boundsStore[id].bounds.width *= part.N.width / trueLastWidth;
      boundsStore[id].bounds.height *= part.N.width / trueLastWidth;
      boundsStore[id].bounds.x =
        (boundsStore[id].bounds.x - part.p.x) * (part.N.width / trueLastWidth) +
        part.p.x;
      boundsStore[id].bounds.y =
        (boundsStore[id].bounds.y - part.p.y) * (part.N.width / trueLastWidth) +
        part.p.y;

      firstRun.current = false;

      invalidate();
      declareBoundsUpdated(id);
    },
  );

  return (
    <group ref={wrapper} {...props}>
      <group ref={widthWrapper}>{meshes}</group>
    </group>
  );
}

export function HeatShieldProperties({ ids }: PartPropertyComponentProps) {
  const { t } = useTranslator();

  const size = useNumericalInputProperty<HeatShield>(
    ids,
    (state) => state.N.width,
    (draft, value) => {
      draft.N.width_original = value;
      draft.N.width = value;
    },
  );

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.heat_shield`}</Properties.Title>

      <Properties.Row>
        <Properties.Input
          {...size}
          label={t`tabs.layout.right_sidebar.properties.heat_shield.size`}
          unit="m"
        />
      </Properties.Row>
    </Properties.Group>
  );
}

export const registry: PartRegistryItem<HeatShield> = {
  category: PartCategory.Propulsion,
  vanillaData: VanillaHeatShieldData,
  data: HeatShieldData,

  Icon: HeatShieldIcon,
  Mesh: HeatShieldLayoutComponent,

  exportify: undefined,
};
