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
  const wrapper = useRef<Group>(null!);
  const mesh = useRef<Mesh>(null!);
  const Model = usePartModel('EngineValiant', 'model');
  const { props } = usePhysicalPart(id, wrapper, mesh);

  return (
    <group ref={wrapper} {...props}>
      <Model ref={mesh} position={[0, -1, 0]} />
    </group>
  );
};

export const EngineValiantIcon = EngineIcon;

export const EngineValiantRegistry: PartRegistryFragment = [
  'Engine Valiant',
  {
    category: PartCategory.Propulsion,

    vanillaData: VanillaEngineValiantData,
    data: EngineValiantData,

    Icon: EngineValiantIcon,
    Mesh: EngineValiantLayoutComponent,

    preload: 'EngineValiant',
  },
];
