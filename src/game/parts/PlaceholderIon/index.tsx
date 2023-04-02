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

export interface VanillaPlaceholderIon
  extends VanillaPartWithTransformations,
    VanillaPartWithEngine {
  readonly n: 'Placeholder Ion';
}

export interface PlaceholderIon
  extends PartWithoutName,
    VanillaPlaceholderIon {}

export const VanillaPlaceholderIonData: VanillaPlaceholderIon = {
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithEngineData,

  n: 'Placeholder Ion',
};

export const PlaceholderIonData: PlaceholderIon = {
  ...PartData,
  ...VanillaPlaceholderIonData,

  label: 'Ion Engine',
};

export const PlaceholderIonLayoutComponent = createPhysicalPart(model);

export const PlaceholderIonIcon = EngineIcon;

export const registry: PartRegistryItem<PlaceholderIon> = {
  category: PartCategory.Propulsion,
  vanillaData: VanillaPlaceholderIonData,
  data: PlaceholderIonData,

  Icon: PlaceholderIonIcon,
  Mesh: PlaceholderIonLayoutComponent,
};
