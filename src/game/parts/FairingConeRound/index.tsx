import { useGLTF } from '@react-three/drei';
import { ReactComponent as Icon } from 'assets/icons/fairing.svg';
import getPart from 'core/part/getPart';
import PartCategory from 'hooks/constants/partCategory';
import useModel from 'hooks/useModel';
import usePhysicalPart from 'hooks/usePartPhysical';
import { useRef } from 'react';
import { PartRegistryItem } from 'stores/partRegistry';
import { Group } from 'three';
import { PartComponentProps } from 'types/Parts';
import {
  PartWithoutName,
  VanillaPart,
  partData,
  vanillaPartData,
} from '../Part';
import {
  PartWithFairing,
  partWithFairingData,
  usePartWithFairing,
} from '../PartWithFairing';
import { PartWithStages, partWithStagesData } from '../PartWithStages';
import {
  PartWithTransformations,
  partWithTransformationsData,
} from '../PartWithTransformations';
import model from './model.gltf';

export interface VanillaHeatShield
  extends VanillaPart,
    PartWithTransformations,
    PartWithFairing {
  readonly n: 'Fairing Cone Round';
}

export interface HeatShield
  extends PartWithoutName,
    PartWithStages,
    VanillaHeatShield {}

export const vanillaHeatShieldData: VanillaHeatShield = {
  ...vanillaPartData,
  ...partWithTransformationsData,
  ...partWithFairingData,

  n: 'Fairing Cone Round',
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
  const { meshes, lastMaterial } = useModel(model, true);
  const { width } = getPart<HeatShield>(id).N;

  usePartWithFairing(id, widthWrapper, lastMaterial);

  return (
    <group ref={wrapper} {...props}>
      <group scale={[width, width, width]} ref={widthWrapper}>
        {meshes}
      </group>
    </group>
  );
}

export default {
  category: PartCategory.Propulsion,
  vanillaData: vanillaHeatShieldData,
  data: heatShieldData,
  label: 'fairing_cone_round',

  Icon,
  LayoutComponent,
} as PartRegistryItem<HeatShield>;
