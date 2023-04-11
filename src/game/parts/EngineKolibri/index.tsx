import { ReactComponent as Icon } from 'assets/icons/engine.svg';
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

export interface VanillaEngineKolibri
  extends VanillaPartWithTransformations,
    VanillaPartWithEngine {
  readonly n: 'Engine Kolibri';
}

export interface EngineKolibri extends PartWithoutName, VanillaEngineKolibri {}

export const VanillaEngineKolibriData: VanillaEngineKolibri = {
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithEngineData,

  n: 'Engine Kolibri',
};

export const EngineKolibriData: EngineKolibri = {
  ...PartData,
  ...VanillaEngineKolibriData,

};

const LayoutComponent = createPhysicalPart(model, false);

export default {
  category: PartCategory.Propulsion,
  vanillaData: VanillaEngineKolibriData,
  data: EngineKolibriData,
  label: 'engine_kolibri',

  Icon,
  LayoutComponent,
} as PartRegistryItem<EngineKolibri>;
