import { useGLTF } from '@react-three/drei';
import { ReactComponent as Icon } from 'assets/icons/nose-cone.svg';
import getPart from 'core/part/getPart';
import PartCategory from 'hooks/constants/partCategory';
import useModel from 'hooks/useModel';
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
import {
  PartWithCone,
  partWithConeData,
  usePartWithCone,
} from '../PartWithCone';
import { PartWithTexture, partWithTextureData } from '../PartWithTexture';
import {
  PartWithTransformations,
  partWithTransformationsData,
} from '../PartWithTransformations';
import model from './model.gltf';

export interface VanillaCone
  extends VanillaPart,
    PartWithCone,
    PartWithTexture,
    PartWithTransformations {
  readonly n: 'Cone';
}

export interface Cone extends PartWithoutName, VanillaCone {}

export const vanillaConeData: VanillaCone = {
  ...vanillaPartData,
  ...partWithConeData,
  ...partWithTextureData,
  ...partWithTransformationsData,

  n: 'Cone',
};

export const coneData: Cone = {
  ...partData,
  ...vanillaConeData,
};

useGLTF.preload(model);
function LayoutComponent({ id }: PartComponentProps) {
  const wrapper = useRef<Group>(null);
  const sizeWrapper = useRef<Group>(null);
  const { size } = getPart<Cone>(id).N;
  const props = usePhysicalPart(id, wrapper);
  const { meshes } = useModel(model);

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
  vanillaData: vanillaConeData,
  data: coneData,
  label: 'cone',

  Icon,
  LayoutComponent,
} as PartRegistryItem<Cone>;
