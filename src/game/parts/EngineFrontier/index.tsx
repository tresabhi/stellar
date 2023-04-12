import { ReactComponent as Icon } from 'assets/icons/engine.svg';
import PartCategory from 'hooks/constants/partCategory';
import { PartRegistryItem } from 'stores/partRegistry';
import createPhysicalPart from 'utilities/createPhysicalPart';
import {
  partData,
  PartWithoutName,
  VanillaPart,
  vanillaPartData,
} from '../Part';
import { PartWithEngine, partWithEngineData } from '../PartWithEngine';
import {
  PartWithTransformations,
  partWithTransformationsData,
} from '../PartWithTransformations';
import model from './model.gltf';

export interface VanillaEngineFrontier
  extends VanillaPart,
    PartWithTransformations,
    PartWithEngine {
  readonly n: 'Engine Frontier';
}

export interface EngineFrontier
  extends PartWithoutName,
    VanillaEngineFrontier {}

export const vanillaEngineFrontierData: VanillaEngineFrontier = {
  ...vanillaPartData,
  ...partWithTransformationsData,
  ...partWithEngineData,

  n: 'Engine Frontier',
};

export const engineFrontierData: EngineFrontier = {
  ...partData,
  ...vanillaEngineFrontierData,
};

const LayoutComponent = createPhysicalPart(model, false);

export default {
  category: PartCategory.Propulsion,
  vanillaData: vanillaEngineFrontierData,
  data: engineFrontierData,
  label: 'engine_frontier',

  Icon,
  LayoutComponent,
} as PartRegistryItem<EngineFrontier>;
