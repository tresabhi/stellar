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

export interface VanillaEngineHawk
  extends VanillaPartWithTransformations,
  VanillaPartWithEngine {
  readonly n: 'Engine Hawk';
}

export interface EngineHawk extends Omit<Part, 'n'>, VanillaEngineHawk {}

export const VanillaEngineHawkData: VanillaEngineHawk = {
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithEngineData,

  n: 'Engine Hawk',
};

export const EngineHawkData: EngineHawk = {
  ...PartData,
  ...VanillaEngineHawkData,

  label: 'Hawk Engine',
};

export const EngineHawkLayoutComponent = createPhysicalPart(model);

export const EngineHawkIcon = EngineIcon;

export const registry: PartRegistryItem<EngineHawk> = {
  category: PartCategory.Propulsion,
  vanillaData: VanillaEngineHawkData,
  data: EngineHawkData,

  Icon: EngineHawkIcon,
  PropertyEditor: undefined,
  Mesh: EngineHawkLayoutComponent,

  exportify: undefined,
};
