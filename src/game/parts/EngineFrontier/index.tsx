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

export const EngineFrontierLayoutComponent = createPhysicalPart(model, [0, -1]);

export const EngineFrontierIcon = EngineIcon;

export const EngineFrontierRegistry: PartRegistryFragment<EngineFrontier> = [
  'Engine Frontier',
  {
    category: PartCategory.Propulsion,

    vanillaData: VanillaEngineFrontierData,
    data: EngineFrontierData,

    Icon: EngineFrontierIcon,
    Mesh: EngineFrontierLayoutComponent,

    preload: 'EngineFrontier',
  },
];
