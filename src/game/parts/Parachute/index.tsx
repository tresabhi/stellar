import { useGLTF } from '@react-three/drei';
import { ReactComponent as Icon } from 'assets/icons/parachute.svg';
import PartCategory from 'hooks/constants/partCategory';
import useModel from 'hooks/useModel';
import usePart from 'hooks/usePart';
import usePhysicalPart from 'hooks/usePartPhysical';
import { useRef } from 'react';
import { PartRegistryItem } from 'stores/partRegistry';
import { Group } from 'three';
import { PartComponentProps } from 'types/Parts';
import {
  partData,
  PartWithoutName,
  VanillaPart,
  vanillaPartData,
} from '../Part';
import { PartWithParachute, partWithParachuteData } from '../PartWithParachute';
import {
  PartWithTransformations,
  partWithTransformationsData,
} from '../PartWithTransformations';
import regularModel from './models/default.gltf';
import deployedModel from './models/deployed.gltf';

export interface VanillaParachute
  extends VanillaPart,
    PartWithTransformations,
    PartWithParachute {
  readonly n: 'Parachute';
}

export interface Parachute extends PartWithoutName, VanillaParachute {}

export const vanillaParachuteData: VanillaParachute = {
  ...vanillaPartData,
  ...partWithTransformationsData,
  ...partWithParachuteData,

  n: 'Parachute',
};

export const parachuteData: Parachute = {
  ...partData,
  ...vanillaParachuteData,
};

useGLTF.preload(regularModel);
useGLTF.preload(deployedModel);
function LayoutComponent({ id }: PartComponentProps) {
  const deployState = usePart<Parachute>(id).N.deploy_state;
  const wrapper = useRef<Group>(null);
  const props = usePhysicalPart(id, wrapper);
  const meshes = useModel(deployState === 0 ? regularModel : deployedModel);

  return (
    <group ref={wrapper} {...props}>
      {meshes}
    </group>
  );
}

export default {
  category: PartCategory.Aerodynamic,
  vanillaData: vanillaParachuteData,
  data: parachuteData,
  label: 'parachute',

  Icon,
  LayoutComponent,
} as PartRegistryItem<Parachute>;
