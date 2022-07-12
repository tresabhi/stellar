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
  const wrapper = useRef<Group>(null!);
  const mesh = useRef<Mesh>(null!);
  const Model = usePartModel('EnginePeregrine', 'model');
  const { props } = usePhysicalPart(id, wrapper, mesh);

  return (
    <group ref={wrapper} {...props}>
      <Model ref={mesh} position={[0, -1, 0]} />
    </group>
  );
};

export const EnginePeregrineIcon = EngineIcon;

export const EnginePeregrineRegistry: PartRegistryFragment = [
  'Engine Peregrine',
  {
    category: PART_CATEGORY.PROPULSION,

    vanillaData: VanillaEnginePeregrineData,
    data: EnginePeregrineData,

    Icon: EnginePeregrineIcon,
    Mesh: EnginePeregrineLayoutComponent,
  },
];
