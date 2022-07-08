import { ReactComponent as EngineIcon } from 'assets/icons/engine.svg';
import useDragControls from 'hooks/useDragControls';
import usePartModel from 'hooks/usePartModel';
import { PartRegistryFragment } from 'hooks/usePartRegistry';
import usePartWithBounds from 'hooks/usePartWithBounds';
import useSelectionControl from 'hooks/useSelectionControl';
import { FC, useRef } from 'react';
import { Group } from 'three';
import { PartComponentProps } from 'types/Parts';
import { Part, PartData } from '../Part';
import {
  VanillaPartWithEngine,
  VanillaPartWithEngineData,
} from '../PartWithEngine';
import {
  usePartWithTransformations,
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

  const handleClick = useSelectionControl(id); // TODO: fix inconsistency: control vs controls
  const handlePointerDown = useDragControls(id);
  usePartWithTransformations(id, group);
  usePartWithBounds(id, group);

  return (
    <group ref={group} onClick={handleClick} onPointerDown={handlePointerDown}>
      <Model position={[0, -1, 0]} />
    </group>
  );
};

export const EngineValiantIcon = EngineIcon;

export const EngineValiantRegistry: PartRegistryFragment = [
  'Engine Valiant',
  {
    vanillaData: VanillaEngineValiantData,
    data: EngineValiantData,

    Icon: EngineValiantIcon,
    Mesh: EngineValiantLayoutComponent,
  },
];
