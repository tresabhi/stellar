import { ReactComponent as EngineIcon } from 'assets/icons/engine.svg';
import PartCategory from 'hooks/constants/partCategory';
import { PartRegistryItem } from 'stores/partRegistry';
import createPhysicalPart from 'utilities/createPhysicalPart';
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

export interface VanillaEngineKolibri
  extends VanillaPartWithTransformations,
    VanillaPartWithEngine {
  readonly n: 'Engine Kolibri';
}

export interface EngineKolibri extends Omit<Part, 'n'>, VanillaEngineKolibri {}

export const VanillaEngineKolibriData: VanillaEngineKolibri = {
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithEngineData,

  n: 'Engine Kolibri',
};

export const EngineKolibriData: EngineKolibri = {
  ...PartData,
  ...VanillaEngineKolibriData,

  label: 'Kolibri Engine',
};

export const EngineKolibriLayoutComponent = createPhysicalPart(model, [0, -1]);

export const EngineKolibriIcon = EngineIcon;

export const registry: PartRegistryItem<EngineKolibri> = {
  category: PartCategory.Propulsion,
  vanillaData: VanillaEngineKolibriData,
  data: EngineKolibriData,

  Icon: EngineKolibriIcon,
  PropertyEditor: undefined,
  Mesh: EngineKolibriLayoutComponent,

  exportify: undefined,
};
