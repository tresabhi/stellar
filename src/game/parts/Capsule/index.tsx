import { ReactComponent as Icon } from 'assets/icons/capsule.svg';
import PartCategory from 'hooks/constants/partCategory';
import { PartRegistryItem } from 'stores/partRegistry';
import createPhysicalPart from 'utilities/createPhysicalPart';
import {
  partData,
  PartWithoutName,
  VanillaPart,
  vanillaPartData,
} from '../Part';
import {
  PartWithTransformations,
  partWithTransformationsData,
} from '../PartWithTransformations';
import model from './model.gltf';

export interface VanillaCapsule extends VanillaPart, PartWithTransformations {
  readonly n: 'Capsule';
}

export interface Capsule extends PartWithoutName, VanillaCapsule {}

export const vanillaCapsuleData: VanillaCapsule = {
  ...vanillaPartData,
  ...partWithTransformationsData,

  n: 'Capsule',
};

export const capsuleData: Capsule = {
  ...partData,
  ...vanillaCapsuleData,
};

const LayoutComponent = createPhysicalPart(model);

export default {
  category: PartCategory.Structural,
  vanillaData: vanillaCapsuleData,
  data: capsuleData,
  label: 'capsule',

  Icon,
  LayoutComponent,
} as PartRegistryItem<Capsule>;
