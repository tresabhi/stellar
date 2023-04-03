import { ReactComponent as Icon } from 'assets/icons/battery.svg';
import PartCategory from 'hooks/constants/partCategory';
import { PartRegistryItem } from 'stores/partRegistry';
import createPhysicalPart from 'utilities/createPhysicalPart';
import { PartData, PartWithoutName } from '../Part';
import {
  VanillaPartWithTransformations,
  VanillaPartWithTransformationsData,
} from '../PartWithTransformations';
import model from './model.gltf';

export interface VanillaPlaceholderRTG extends VanillaPartWithTransformations {
  readonly n: 'Placeholder RTG';
}

export interface PlaceholderRTG
  extends PartWithoutName,
    VanillaPlaceholderRTG {}

export const VanillaPlaceholderRTGData: VanillaPlaceholderRTG = {
  ...VanillaPartWithTransformationsData,

  n: 'Placeholder RTG',
};

export const PlaceholderRTGData: PlaceholderRTG = {
  ...PartData,
  ...VanillaPlaceholderRTGData,

  label: 'Battery',
};

const LayoutComponent = createPhysicalPart(model);

export default {
  category: PartCategory.Structural,
  vanillaData: VanillaPlaceholderRTGData,
  data: PlaceholderRTGData,

  Icon,
  LayoutComponent,
} as PartRegistryItem<PlaceholderRTG>;
