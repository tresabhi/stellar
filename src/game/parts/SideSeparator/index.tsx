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
import {
  partData,
  PartWithoutName,
  VanillaPart,
  vanillaPartData,
} from '../Part';
import { PartWithFragment, partWithFragmentData } from '../PartWithFragment';
import { PartWithStage, partWithStageData } from '../PartWithStage';
import {
  PartWithTransformations,
  partWithTransformationsData,
} from '../PartWithTransformations';
import regularModel from './models/default.gltf';
import leftModel from './models/left.gltf';
import rightModel from './models/right.gltf';

export interface VanillaSideSeparator
  extends VanillaPart,
    PartWithTransformations,
    PartWithFragment {
  readonly n: 'Side Separator';
  N: { force_percent: number };
}

export interface SideSeparator
  extends PartWithoutName,
    PartWithStage,
    VanillaSideSeparator {}

export const vanillaSideSeparatorData: VanillaSideSeparator = {
  ...vanillaPartData,
  ...partWithTransformationsData,
  ...partWithFragmentData,

  n: 'Side Separator',
  N: { force_percent: 0.5 },
};

export const sideSeparatorData: SideSeparator = {
  ...partData,
  ...partWithStageData,
  ...vanillaSideSeparatorData,
};

useGLTF.preload(regularModel);
useGLTF.preload(leftModel);
useGLTF.preload(rightModel);
function LayoutComponent({ id }: PartComponentProps) {
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

export default {
  category: PartCategory.Aerodynamic,
  vanillaData: vanillaSideSeparatorData,
  data: sideSeparatorData,
  label: 'side_separator',

  Icon,
  LayoutComponent,
} as PartRegistryItem<SideSeparator>;
