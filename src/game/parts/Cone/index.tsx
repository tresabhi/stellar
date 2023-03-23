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

export interface VanillaCone
  extends VanillaPartWithCone,
    VanillaPartWithTexture,
    VanillaPartWithTransformations {
  readonly n: 'Cone';
}

export interface Cone extends PartWithoutName, VanillaCone {}

export const VanillaConeData: VanillaCone = {
  ...VanillaPartWithConeData,
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithTextureData,

  n: 'Cone',
};

export const ConeData: Cone = {
  ...PartData,
  ...VanillaConeData,

  label: 'Cone',
};

useGLTF.preload(model);
export default function ConeLayoutComponent({ id }: PartComponentProps) {
  const wrapper = useRef<Group>(null);
  const sizeWrapper = useRef<Group>(null);
  const { size } = getPart<Cone>(id).N;
  const props = usePhysicalPart(id, wrapper);
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

export const ConeIcon = Icon;

export const registry: PartRegistryItem<Cone> = {
  category: PartCategory.Structural,
  vanillaData: VanillaConeData,
  data: ConeData,

  Icon: ConeIcon,
  Mesh: ConeLayoutComponent,

  exportify: undefined,
};
