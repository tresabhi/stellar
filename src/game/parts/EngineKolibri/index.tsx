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

export interface VanillaEngineKolibri
  extends VanillaPart,
    PartWithTransformations,
    PartWithEngine {
  readonly n: 'Engine Kolibri';
}

export interface EngineKolibri
  extends PartWithoutName,
    PartWithStage,
    VanillaEngineKolibri {}

export const vanillaEngineKolibriData: VanillaEngineKolibri = {
  ...vanillaPartData,
  ...partWithTransformationsData,
  ...partWithEngineData,

  n: 'Engine Kolibri',
};

export const engineKolibriData: EngineKolibri = {
  ...partData,
  ...partWithStageData,
  ...vanillaEngineKolibriData,
};

const LayoutComponent = createPhysicalPart(model, false);

export default {
  category: PartCategory.Propulsion,
  vanillaData: vanillaEngineKolibriData,
  data: engineKolibriData,
  label: 'engine_kolibri',

  Icon,
  LayoutComponent,
} as PartRegistryItem<EngineKolibri>;
