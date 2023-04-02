import { ReactComponent as PlaceholderRTGIconPrimitive } from 'assets/icons/battery.svg';
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

export const PlaceholderRTGLayoutComponent = createPhysicalPart(model);

export const PlaceholderRTGIcon = PlaceholderRTGIconPrimitive;

export const registry: PartRegistryItem<PlaceholderRTG> = {
  category: PartCategory.Structural,
  vanillaData: VanillaPlaceholderRTGData,
  data: PlaceholderRTGData,

  Icon: PlaceholderRTGIcon,
  Mesh: PlaceholderRTGLayoutComponent,
};
