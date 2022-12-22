import { ReactComponent as EngineIcon } from 'assets/icons/engine.svg';
import PartCategory from 'hooks/constants/partCategory';
import { PartRegistryItem } from 'stores/partRegistry';
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

export const EngineTitanLayoutComponent = createPhysicalPart(model);

export const EngineTitanIcon = EngineIcon;

export const registry: PartRegistryItem<EngineTitan> = {
  category: PartCategory.Propulsion,
  vanillaData: VanillaEngineTitanData,
  data: EngineTitanData,

  Icon: EngineTitanIcon,
  PropertyEditor: undefined,
  Mesh: EngineTitanLayoutComponent,

  exportify: undefined,
};
