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
import { PartWithStage, partWithStageData } from '../PartWithStage';
import {
  PartWithTransformations,
  partWithTransformationsData,
} from '../PartWithTransformations';
import model from './model.gltf';

export interface VanillaEngineTitan
  extends VanillaPart,
    PartWithTransformations,
    PartWithEngine {
  readonly n: 'Engine Titan';
}

export interface EngineTitan
  extends PartWithoutName,
    PartWithStage,
    VanillaEngineTitan {}

export const vanillaEngineTitanData: VanillaEngineTitan = {
  ...vanillaPartData,
  ...partWithTransformationsData,
  ...partWithEngineData,

  n: 'Engine Titan',
};

export const engineTitanData: EngineTitan = {
  ...partData,
  ...partWithStageData,
  ...vanillaEngineTitanData,
};

const LayoutComponent = createPhysicalPart(model, false);

export default {
  category: PartCategory.Propulsion,
  vanillaData: vanillaEngineTitanData,
  data: engineTitanData,
  label: 'engine_titan',

  Icon,
  LayoutComponent,
} as PartRegistryItem<EngineTitan>;
