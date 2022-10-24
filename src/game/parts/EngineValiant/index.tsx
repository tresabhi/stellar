import { ReactComponent as EngineIcon } from 'assets/icons/engine.svg';
import PartCategory from 'hooks/constants/partCategory';
import { PartRegistryFragment } from 'stores/usePartRegistry';
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

export interface VanillaEngineValiant
  extends VanillaPartWithTransformations,
    VanillaPartWithEngine {
  readonly n: 'Engine Valiant';
}

export interface EngineValiant extends Omit<Part, 'n'>, VanillaEngineValiant {}

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

export const EngineValiantLayoutComponent = createPhysicalPart(model, [0, -1]);

export const EngineValiantIcon = EngineIcon;

export const EngineValiantRegistry: PartRegistryFragment<EngineValiant> = [
  'Engine Valiant',
  {
    category: PartCategory.Propulsion,

    vanillaData: VanillaEngineValiantData,
    data: EngineValiantData,

    Icon: EngineValiantIcon,
    Mesh: EngineValiantLayoutComponent,

    preload: 'EngineValiant',
  },
];
