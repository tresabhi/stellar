import { useGLTF } from '@react-three/drei';
import { invalidate } from '@react-three/fiber';
import { ReactComponent as Icon } from 'assets/icons/heat-shield.svg';
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
import {
  PartWithoutName,
  VanillaPart,
  partData,
  vanillaPartData,
} from '../Part';
import { PartWithStages, partWithStagesData } from '../PartWithStages';
import {
  PartWithTransformations,
  partWithTransformationsData,
} from '../PartWithTransformations';
import model from './model.gltf';

export interface VanillaHeatShield
  extends VanillaPart,
    PartWithTransformations {
  readonly n: 'Heat Shield';

  N: {
    width_original: number;
    width: number;
    shield_temp: '-Infinity';
  };
}

export interface HeatShield
  extends PartWithoutName,
    PartWithStages,
    VanillaHeatShield {}

export const vanillaHeatShieldData: VanillaHeatShield = {
  ...vanillaPartData,
  ...partWithTransformationsData,

  n: 'Heat Shield',

  N: {
    width_original: 1,
    width: 1,
    shield_temp: '-Infinity',
  },
};

export const heatShieldData: HeatShield = {
  ...partData,
  ...partWithStagesData,
  ...vanillaHeatShieldData,
};

useGLTF.preload(model);
function LayoutComponent({ id }: PartComponentProps) {
  const wrapper = useRef<Group>(null);
  const widthWrapper = useRef<Group>(null);
  const props = usePhysicalPart(id, wrapper);
  const { meshes } = useModel(model);
  const { width } = getPart<HeatShield>(id).N;

  usePartProperty(
    id,
    (state: HeatShield) => state.N.width,
    (newWidth, lastWidth) => {
      const { p } = getPart<HeatShield>(id);
      const { bounds } = boundsStore[id];
      const scale = newWidth / lastWidth;

      bounds.width *= scale;
      bounds.height *= scale;
      bounds.x = (bounds.x - p.x) * scale + p.x;
      bounds.y = (bounds.y - p.y) * scale + p.y;

      widthWrapper.current?.scale.set(newWidth, newWidth, 1);
      invalidate();
      declareBoundsUpdated(id);
    },
  );

  return (
    <group ref={wrapper} {...props}>
      <group scale={[width, width, width]} ref={widthWrapper}>
        {meshes}
      </group>
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

export default {
  category: PartCategory.Propulsion,
  vanillaData: vanillaHeatShieldData,
  data: heatShieldData,
  label: 'heat_shield',

  Icon,
  LayoutComponent,
} as PartRegistryItem<HeatShield>;
