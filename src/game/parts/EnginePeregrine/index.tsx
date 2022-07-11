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

export interface VanillaEnginePeregrine
  extends VanillaPartWithTransformations,
    VanillaPartWithEngine {
  readonly n: 'Engine Peregrine';
}

export interface EnginePeregrine
  extends Omit<Part, 'n'>,
    VanillaEnginePeregrine {}

export const VanillaEnginePeregrineData: VanillaEnginePeregrine = {
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithEngineData,

  n: 'Engine Peregrine',
};

export const EnginePeregrineData: EnginePeregrine = {
  ...PartData,
  ...VanillaEnginePeregrineData,

  label: 'Peregrine Engine',
};

export const EnginePeregrineLayoutComponent: FC<PartComponentProps> = ({
  id,
}) => {
  const group = useRef<Group>(null!);
  const Model = usePartModel('EnginePeregrine', 'model');
  const { props } = usePhysicalPart(id, group);

  return (
    <group ref={group} {...props}>
      <Model position={[0, -1, 0]} />
    </group>
  );
};

export const EnginePeregrineIcon = EngineIcon;

export const EnginePeregrineRegistry: PartRegistryFragment = [
  'Engine Peregrine',
  {
    vanillaData: VanillaEnginePeregrineData,
    data: EnginePeregrineData,

    Icon: EnginePeregrineIcon,
    Mesh: EnginePeregrineLayoutComponent,
  },
];
