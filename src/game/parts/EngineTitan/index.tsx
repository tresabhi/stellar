import { ReactComponent as EngineIcon } from 'assets/icons/engine.svg';
import PartCategory from 'hooks/constants/partCategory';
import usePartModel from 'hooks/usePartModel';
import usePhysicalPart from 'hooks/usePhysicalPart';
import { FC, useRef } from 'react';
import { PartRegistryFragment } from 'stores/usePartRegistry';
import { Group, Mesh } from 'three';
import { PartComponentProps } from 'types/Parts';
import { Part, PartData } from '../Part';
import {
  VanillaPartWithEngine,
  VanillaPartWithEngineData,
} from '../PartWithEngine';
import {
  VanillaPartWithTransformations,
  VanillaPartWithTransformationsData,
} from '../PartWithTransformations';

export interface VanillaEngineTitan
  extends VanillaPartWithTransformations,
    VanillaPartWithEngine {
  readonly n: 'Engine Titan';
}

export interface EngineTitan extends Omit<Part, 'n'>, VanillaEngineTitan {}

export const VanillaEngineTitanData: VanillaEngineTitan = {
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithEngineData,

  n: 'Engine Titan',
};

export const EngineTitanData: EngineTitan = {
  ...PartData,
  ...VanillaEngineTitanData,

  label: 'Titan Engine',
};

export const EngineTitanLayoutComponent: FC<PartComponentProps> = ({ id }) => {
  const wrapper = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);
  const Model = usePartModel('EngineTitan', 'model');
  const { props } = usePhysicalPart(id, wrapper, mesh);

  return (
    <group ref={wrapper} {...props}>
      <Model ref={mesh} position={[0, -2, 0]} />
    </group>
  );
};

export const EngineTitanIcon = EngineIcon;

export const EngineTitanRegistry: PartRegistryFragment<EngineTitan> = [
  'Engine Titan',
  {
    category: PartCategory.Propulsion,

    vanillaData: VanillaEngineTitanData,
    data: EngineTitanData,

    Icon: EngineTitanIcon,
    Mesh: EngineTitanLayoutComponent,

    preload: 'EngineTitan',
  },
];
