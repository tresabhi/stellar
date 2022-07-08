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
