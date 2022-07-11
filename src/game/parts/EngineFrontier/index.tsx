import { ReactComponent as EngineIcon } from 'assets/icons/engine.svg';
import usePartModel from 'hooks/usePartModel';
import { PartRegistryFragment } from 'hooks/usePartRegistry';
import usePhysicalPart from 'hooks/usePhysicalPart';
import { FC, useRef } from 'react';
import { Group } from 'three';
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
  const group = useRef<Group>(null!);
  const Model = usePartModel('EngineFrontier', 'model');
  const { props } = usePhysicalPart(id, group);

  return (
    <group ref={group} {...props}>
      <Model position={[0, -1, 0]} />
    </group>
  );
};

export const EngineFrontierIcon = EngineIcon;

export const EngineFrontierRegistry: PartRegistryFragment = [
  'Engine Frontier',
  {
    vanillaData: VanillaEngineFrontierData,
    data: EngineFrontierData,

    Icon: EngineFrontierIcon,
    Mesh: EngineFrontierLayoutComponent,
  },
];
