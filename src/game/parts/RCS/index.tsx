import { ReactComponent as Icon } from 'assets/icons/reaction-control-system.svg';
import PartCategory from 'hooks/constants/partCategory';
import { PartRegistryItem } from 'stores/partRegistry';
import createPhysicalPart from 'utilities/createPhysicalPart';
import {
  partData,
  PartWithoutName,
  VanillaPart,
  vanillaPartData,
} from '../Part';
import { PartWithStages, partWithStagesData } from '../PartWithStages';
import {
  PartWithTransformations,
  partWithTransformationsData,
} from '../PartWithTransformations';
import model from './model.gltf';

export interface VanillaRCS extends VanillaPart, PartWithTransformations {
  readonly n: 'RCS';
}

export interface RCS extends PartWithoutName, PartWithStages, VanillaRCS {}

export const vanillaRCSData: VanillaRCS = {
  ...vanillaPartData,
  ...partWithTransformationsData,

  n: 'RCS',
};

export const RCSData: RCS = {
  ...partData,
  ...partWithStagesData,
  ...vanillaRCSData,
};

const LayoutComponent = createPhysicalPart(model, false, true);

export default {
  category: PartCategory.Structural,
  vanillaData: vanillaRCSData,
  data: RCSData,
  label: 'rcs',

  Icon,
  LayoutComponent,
} as PartRegistryItem<RCS>;
