import { useGLTF } from '@react-three/drei';
import { ReactComponent as Icon } from 'assets/icons/landing-leg.svg';
import PartCategory from 'hooks/constants/partCategory';
import useModel from 'hooks/useModel';
import usePart from 'hooks/usePart';
import usePhysicalPart from 'hooks/usePartPhysical';
import { useRef } from 'react';
import { PartRegistryItem } from 'stores/partRegistry';
import { Group } from 'three';
import { PartComponentProps } from 'types/Parts';
import { PartData, PartWithoutName } from '../Part';
import {
  VanillaPartWithLandingLeg,
  VanillaPartWithLandingLegData,
} from '../PartWithLandingLeg';
import {
  VanillaPartWithTransformations,
  VanillaPartWithTransformationsData,
} from '../PartWithTransformations';
import regularModel from './models/default.gltf';
import extendedModel from './models/extended.gltf';

export interface VanillaLandingLeg
  extends VanillaPartWithTransformations,
    VanillaPartWithLandingLeg {
  readonly n: 'Landing Leg';
}

export interface LandingLeg extends PartWithoutName, VanillaLandingLeg {}

export const VanillaLandingLegData: VanillaLandingLeg = {
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithLandingLegData,

  n: 'Landing Leg',
};

export const LandingLegData: LandingLeg = {
  ...PartData,
  ...VanillaLandingLegData,
};

useGLTF.preload(regularModel);
useGLTF.preload(extendedModel);
function LayoutComponent({ id }: PartComponentProps) {
  const deployState = usePart<LandingLeg>(id).N.deploy_state;
  const wrapper = useRef<Group>(null);
  const props = usePhysicalPart(id, wrapper, false);
  const meshes = useModel(deployState === 0 ? regularModel : extendedModel);

  return (
    <group ref={wrapper} {...props}>
      {meshes}
    </group>
  );
}

export default {
  category: PartCategory.Aerodynamic,
  vanillaData: VanillaLandingLegData,
  data: LandingLegData,
  label: 'landing_leg',

  Icon,
  LayoutComponent,
} as PartRegistryItem<LandingLeg>;
