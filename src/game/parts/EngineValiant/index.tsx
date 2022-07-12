import { ReactComponent as EngineIcon } from 'assets/icons/engine.svg';
import PART_CATEGORY from 'hooks/constants/partCategory';
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

export interface VanillaEngineValiant
  extends VanillaPartWithTransformations,
    VanillaPartWithEngine {
  readonly n: 'Engine Valiant';
}

export interface EngineValiant extends Omit<Part, 'n'>, VanillaEngineValiant {}

export const VanillaEngineValiantData: VanillaEngineValiant = {
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithEngineData,

  n: 'Engine Valiant',
};

export const EngineValiantData: EngineValiant = {
  ...PartData,
  ...VanillaEngineValiantData,

  label: 'Valiant Engine',
};

export const EngineValiantLayoutComponent: FC<PartComponentProps> = ({
  id,
}) => {
  const group = useRef<Group>(null!);
  const Model = usePartModel('EngineValiant', 'model');
  const { props } = usePhysicalPart(id, group);

  return (
    <group ref={group} {...props}>
      <Model position={[0, -1, 0]} />
    </group>
  );
};

export const EngineValiantIcon = EngineIcon;

export const EngineValiantRegistry: PartRegistryFragment = [
  'Engine Valiant',
  {
    category: PART_CATEGORY.PROPULSION,

    vanillaData: VanillaEngineValiantData,
    data: EngineValiantData,

    Icon: EngineValiantIcon,
    Mesh: EngineValiantLayoutComponent,
  },
];
