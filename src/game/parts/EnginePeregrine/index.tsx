import { ReactComponent as EngineIcon } from 'assets/icons/engine.svg';
import PartCategory from 'hooks/constants/partCategory';
import { PartRegistryFragment } from 'stores/usePartRegistry';
import { createPhysicalPart } from 'utilities/createPhysicalPart';
import { Part, PartData } from '../Part';
import {
  VanillaPartWithEngine,
  VanillaPartWithEngineData,
} from '../PartWithEngine';
import {
  VanillaPartWithTransformations,
  VanillaPartWithTransformationsData,
} from '../PartWithTransformations';
import model from './model.gltf';

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

export const EnginePeregrineLayoutComponent = createPhysicalPart(
  model,
  [0, -1],
);

export const EnginePeregrineIcon = EngineIcon;

export const EnginePeregrineRegistry: PartRegistryFragment<EnginePeregrine> = [
  'Engine Peregrine',
  {
    category: PartCategory.Propulsion,

    vanillaData: VanillaEnginePeregrineData,
    data: EnginePeregrineData,

    Icon: EnginePeregrineIcon,
    Mesh: EnginePeregrineLayoutComponent,

    preload: 'EnginePeregrine',
  },
];
