import { ReactComponent as EngineIcon } from 'assets/icons/engine.svg';
import PART_CATEGORY from 'hooks/constants/partCategory';
import usePartModel from 'hooks/usePartModel';
import { PartRegistryFragment } from 'hooks/usePartRegistry';
import usePhysicalPart from 'hooks/usePhysicalPart';
import { FC, useRef } from 'react';
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

export interface VanillaEngineFrontier
  extends VanillaPartWithTransformations,
    VanillaPartWithEngine {
  readonly n: 'Engine Frontier';
}

export interface EngineFrontier
  extends Omit<Part, 'n'>,
    VanillaEngineFrontier {}

export const VanillaEngineFrontierData: VanillaEngineFrontier = {
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithEngineData,

  n: 'Engine Frontier',
};

export const EngineFrontierData: EngineFrontier = {
  ...PartData,
  ...VanillaEngineFrontierData,

  label: 'Frontier Engine',
};

export const EngineFrontierLayoutComponent: FC<PartComponentProps> = ({
  id,
}) => {
  const wrapper = useRef<Group>(null!);
  const mesh = useRef<Mesh>(null!);
  const Model = usePartModel('EngineFrontier', 'model');
  const { props } = usePhysicalPart(id, wrapper, mesh);

  return (
    <group ref={wrapper} {...props}>
      <Model ref={mesh} position={[0, -1, 0]} />
    </group>
  );
};

export const EngineFrontierIcon = EngineIcon;

export const EngineFrontierRegistry: PartRegistryFragment = [
  'Engine Frontier',
  {
    category: PART_CATEGORY.PROPULSION,

    vanillaData: VanillaEngineFrontierData,
    data: EngineFrontierData,

    Icon: EngineFrontierIcon,
    Mesh: EngineFrontierLayoutComponent,
  },
];
