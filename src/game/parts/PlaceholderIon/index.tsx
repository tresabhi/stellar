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
import {
  PartWithTransformations,
  partWithTransformationsData,
} from '../PartWithTransformations';
import model from './model.gltf';

export interface VanillaPlaceholderIon
  extends VanillaPart,
    PartWithTransformations,
    PartWithEngine {
  readonly n: 'Placeholder Ion';
}

export interface PlaceholderIon
  extends PartWithoutName,
    VanillaPlaceholderIon {}

export const vanillaPlaceholderIonData: VanillaPlaceholderIon = {
  ...vanillaPartData,
  ...partWithTransformationsData,
  ...partWithEngineData,

  n: 'Placeholder Ion',
};

export const placeholderIonData: PlaceholderIon = {
  ...partData,
  ...vanillaPlaceholderIonData,
};

const LayoutComponent = createPhysicalPart(model);

export default {
  category: PartCategory.Propulsion,
  vanillaData: vanillaPlaceholderIonData,
  data: placeholderIonData,
  label: 'placeholder_ion',

  Icon,
  LayoutComponent,
} as PartRegistryItem<PlaceholderIon>;
