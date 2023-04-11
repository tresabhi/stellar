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

export interface VanillaEngineHawk
  extends VanillaPartWithTransformations,
    VanillaPartWithEngine {
  readonly n: 'Engine Hawk';
}

export interface EngineHawk extends PartWithoutName, VanillaEngineHawk {}

export const VanillaEngineHawkData: VanillaEngineHawk = {
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithEngineData,

  n: 'Engine Hawk',
};

export const EngineHawkData: EngineHawk = {
  ...PartData,
  ...VanillaEngineHawkData,

};

const LayoutComponent = createPhysicalPart(model, false);

export default {
  category: PartCategory.Propulsion,
  vanillaData: VanillaEngineHawkData,
  data: EngineHawkData,
  label: 'engine_hawk',

  Icon,
  LayoutComponent,
} as PartRegistryItem<EngineHawk>;
