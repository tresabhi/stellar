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

export interface VanillaEngineValiant
  extends VanillaPartWithTransformations,
    VanillaPartWithEngine {
  readonly n: 'Engine Valiant';
}

export interface EngineValiant extends PartWithoutName, VanillaEngineValiant {}

export const VanillaEngineValiantData: VanillaEngineValiant = {
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithEngineData,

  n: 'Engine Valiant',
};

export const EngineValiantData: EngineValiant = {
  ...PartData,
  ...VanillaEngineValiantData,

  label: 'Valiant Engine',
};

export const EngineValiantLayoutComponent = createPhysicalPart(model);

export const EngineValiantIcon = EngineIcon;

export const registry: PartRegistryItem<EngineValiant> = {
  category: PartCategory.Propulsion,
  vanillaData: VanillaEngineValiantData,
  data: EngineValiantData,

  Icon: EngineValiantIcon,
  Mesh: EngineValiantLayoutComponent,

  exportify: undefined,
};
