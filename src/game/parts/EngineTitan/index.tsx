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

export interface VanillaEngineTitan
  extends VanillaPartWithTransformations,
    VanillaPartWithEngine {
  readonly n: 'Engine Titan';
}

export interface EngineTitan extends Omit<Part, 'n'>, VanillaEngineTitan {}

export const VanillaEngineTitanData: VanillaEngineTitan = {
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithEngineData,

  n: 'Engine Titan',
};

export const EngineTitanData: EngineTitan = {
  ...PartData,
  ...VanillaEngineTitanData,

  label: 'Titan Engine',
};

export const EngineTitanLayoutComponent = createPhysicalPart(model, [0, -2]);

export const EngineTitanIcon = EngineIcon;

export const EngineTitanRegistry: PartRegistryFragment<EngineTitan> = [
  'Engine Titan',
  {
    category: PartCategory.Propulsion,

    vanillaData: VanillaEngineTitanData,
    data: EngineTitanData,

    Icon: EngineTitanIcon,
    Mesh: EngineTitanLayoutComponent,

    preload: 'EngineTitan',
  },
];
