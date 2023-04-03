import { useGLTF } from '@react-three/drei';
import { ReactComponent as Icon } from 'assets/icons/separator-side.svg';
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
  VanillaPartWithFragment,
  VanillaPartWithFragmentData,
} from '../PartWithFragment';
import {
  VanillaPartWithTransformations,
  VanillaPartWithTransformationsData,
} from '../PartWithTransformations';
import regularModel from './models/default.gltf';
import leftModel from './models/left.gltf';
import rightModel from './models/right.gltf';

export interface VanillaSideSeparator
  extends VanillaPartWithTransformations,
    VanillaPartWithFragment {
  readonly n: 'Side Separator';
  N: { force_percent: number };
}

export interface SideSeparator extends PartWithoutName, VanillaSideSeparator {}

export const VanillaSideSeparatorData: VanillaSideSeparator = {
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithFragmentData,

  n: 'Side Separator',
  N: { force_percent: 0.5 },
};

export const SideSeparatorData: SideSeparator = {
  ...PartData,
  ...VanillaSideSeparatorData,

  label: 'Side Separator',
};

useGLTF.preload(regularModel);
useGLTF.preload(leftModel);
useGLTF.preload(rightModel);
export function SideSeparatorLayoutComponent({ id }: PartComponentProps) {
  const deployState = usePart<SideSeparator>(id).T.fragment;
  const wrapper = useRef<Group>(null);
  const props = usePhysicalPart(id, wrapper, false);
  const isModelDefault = deployState === null || deployState === '';
  const sidedModel = deployState === 'left' ? leftModel : rightModel;
  const meshes = useModel(isModelDefault ? regularModel : sidedModel);

  return (
    <group ref={wrapper} {...props}>
      {meshes}
    </group>
  );
}

export const registry: PartRegistryItem<SideSeparator> = {
  category: PartCategory.Aerodynamic,
  vanillaData: VanillaSideSeparatorData,
  data: SideSeparatorData,

  Icon,
  Mesh: SideSeparatorLayoutComponent,
};
