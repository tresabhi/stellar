import { useGLTF } from '@react-three/drei';
import { ReactComponent as Icon } from 'assets/icons/nose-cone-slanted.svg';
import getPart from 'core/part/getPart';
import PartCategory from 'hooks/constants/partCategory';
import useModel from 'hooks/useModel';
import usePhysicalPart from 'hooks/usePartPhysical';
import { useRef } from 'react';
import { PartRegistryItem } from 'stores/partRegistry';
import { Group } from 'three';
import { PartComponentProps } from 'types/Parts';
import { PartData, PartWithoutName } from '../Part';
import {
  VanillaPartWithCone,
  VanillaPartWithConeData,
  usePartWithCone,
} from '../PartWithCone';
import {
  VanillaPartWithTexture,
  VanillaPartWithTextureData,
} from '../PartWithTexture';
import {
  VanillaPartWithTransformations,
  VanillaPartWithTransformationsData,
} from '../PartWithTransformations';
import model from './model.gltf';

export interface VanillaConeSide
  extends VanillaPartWithCone,
    VanillaPartWithTexture,
    VanillaPartWithTransformations {
  readonly n: 'Cone Side';
}

export interface ConeSide extends PartWithoutName, VanillaConeSide {}

export const VanillaConeSideData: VanillaConeSide = {
  ...VanillaPartWithConeData,
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithTextureData,

  n: 'Cone Side',
};

export const ConeSideData: ConeSide = {
  ...PartData,
  ...VanillaConeSideData,

  label: 'Side Cone',
};

useGLTF.preload(model);
function LayoutComponent({ id }: PartComponentProps) {
  const wrapper = useRef<Group>(null);
  const sizeWrapper = useRef<Group>(null);
  const { size } = getPart<ConeSide>(id).N;
  const props = usePhysicalPart(id, wrapper, false);
  const meshes = useModel(model);

  usePartWithCone(id, sizeWrapper);

  return (
    <group ref={wrapper} {...props}>
      <group scale={[size, size, size]} ref={sizeWrapper}>
        {meshes}
      </group>
    </group>
  );
}

export default {
  category: PartCategory.Structural,
  vanillaData: VanillaConeSideData,
  data: ConeSideData,

  Icon,
  LayoutComponent,
} as PartRegistryItem<ConeSide>;
