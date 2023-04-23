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
import { PartWithStages, partWithStagesData } from '../PartWithStages';
import {
  PartWithTransformations,
  partWithTransformationsData,
} from '../PartWithTransformations';
import model from './model.gltf';

export interface VanillaEngineValiant
  extends VanillaPart,
    PartWithTransformations,
    PartWithEngine {
  readonly n: 'Engine Valiant';
}

export interface EngineValiant
  extends PartWithoutName,
    PartWithStages,
    VanillaEngineValiant {}

export const vanillaEngineValiantData: VanillaEngineValiant = {
  ...vanillaPartData,
  ...partWithTransformationsData,
  ...partWithEngineData,

  n: 'Engine Valiant',
};

export const engineValiantData: EngineValiant = {
  ...partData,
  ...partWithStagesData,
  ...vanillaEngineValiantData,
};

const LayoutComponent = createPhysicalPart(model, false);

export default {
  category: PartCategory.Propulsion,
  vanillaData: vanillaEngineValiantData,
  data: engineValiantData,
  label: 'engine_valiant',

  Icon,
  LayoutComponent,
} as PartRegistryItem<EngineValiant>;
