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

export interface VanillaEngineKolibri
  extends VanillaPartWithTransformations,
    VanillaPartWithEngine {
  readonly n: 'Engine Kolibri';
}

export interface EngineKolibri extends Omit<Part, 'n'>, VanillaEngineKolibri {}

export const VanillaEngineKolibriData: VanillaEngineKolibri = {
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithEngineData,

  n: 'Engine Kolibri',
};

export const EngineKolibriData: EngineKolibri = {
  ...PartData,
  ...VanillaEngineKolibriData,

  label: 'Kolibri Engine',
};

export const EngineKolibriLayoutComponent: FC<PartComponentProps> = ({
  id,
}) => {
  const group = useRef<Group>(null!);
  const Model = usePartModel('EngineKolibri', 'model');
  const { props } = usePhysicalPart(id, group);

  return (
    <group ref={group} {...props}>
      <Model position={[0, -1, 0]} />
    </group>
  );
};

export const EngineKolibriIcon = EngineIcon;

export const EngineKolibriRegistry: PartRegistryFragment = [
  'Engine Kolibri',
  {
    category: PART_CATEGORY.PROPULSION,

    vanillaData: VanillaEngineKolibriData,
    data: EngineKolibriData,

    Icon: EngineKolibriIcon,
    Mesh: EngineKolibriLayoutComponent,
  },
];
