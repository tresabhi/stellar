import { ReactComponent as EngineIcon } from 'assets/icons/engine.svg';
import PartCategory from 'hooks/constants/partCategory';
import { PartRegistryItem } from 'stores/partRegistry';
import createPhysicalPart from 'utilities/createPhysicalPart';
import { PartData, PartWithoutName } from '../Part';
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
  extends PartWithoutName,
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

export const EngineFrontierLayoutComponent = createPhysicalPart(model);

export const EngineFrontierIcon = EngineIcon;

export const registry: PartRegistryItem<EngineFrontier> = {
  category: PartCategory.Propulsion,
  vanillaData: VanillaEngineFrontierData,
  data: EngineFrontierData,

  Icon: EngineFrontierIcon,
  Mesh: EngineFrontierLayoutComponent,

  exportify: undefined,
};
