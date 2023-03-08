import { useGLTF } from '@react-three/drei';
import { invalidate } from '@react-three/fiber';
import { ReactComponent as Icon } from 'assets/icons/nose-cone.svg';
import declareBoundsUpdated from 'core/bounds/declareBoundsUpdated';
import getPart from 'core/part/getPart';
import PartCategory from 'hooks/constants/partCategory';
import useModel from 'hooks/useModel';
import usePhysicalPart from 'hooks/usePartPhysical';
import usePartProperty from 'hooks/usePartProperty';
import { useRef } from 'react';
import boundsStore from 'stores/bounds';
import { PartRegistryItem } from 'stores/partRegistry';
import { Group } from 'three';
import { PartComponentProps } from 'types/Parts';
import { PartData, PartWithoutName } from '../Part';
import { VanillaPartWithCone, VanillaPartWithConeData } from '../PartWithCone';
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

  usePartProperty(
    id,
    (newState: Cone) => newState.N.size,
    (newSize, lastSize) => {
      sizeWrapper.current?.scale.set(newSize, newSize, newSize);

      const { p } = getPart<Cone>(id);
      const { bounds } = boundsStore[id];
      const changedScale = newSize / lastSize;

      bounds.x = p.x + (bounds.x - p.x) * changedScale;
      bounds.y = p.y + (bounds.y - p.y) * changedScale;
      bounds.width *= changedScale;
      bounds.height *= changedScale;

      declareBoundsUpdated(id);
      invalidate();
    },
  );

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
