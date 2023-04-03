import { ReactComponent as Icon } from 'assets/icons/capsule.svg';
import PartCategory from 'hooks/constants/partCategory';
import { PartRegistryItem } from 'stores/partRegistry';
import createPhysicalPart from 'utilities/createPhysicalPart';
import { PartData, PartWithoutName } from '../Part';
import {
  VanillaPartWithTransformations,
  VanillaPartWithTransformationsData,
} from '../PartWithTransformations';
import model from './model.gltf';

export interface VanillaCapsule extends VanillaPartWithTransformations {
  readonly n: 'Capsule';
}

export interface Capsule extends PartWithoutName, VanillaCapsule {}

export const VanillaCapsuleData: VanillaCapsule = {
  ...VanillaPartWithTransformationsData,

  n: 'Capsule',
};

export const CapsuleData: Capsule = {
  ...PartData,
  ...VanillaCapsuleData,

  label: 'Capsule',
};

const LayoutComponent = createPhysicalPart(model);

export default {
  category: PartCategory.Structural,
  vanillaData: VanillaCapsuleData,
  data: CapsuleData,

  Icon,
  LayoutComponent,
} as PartRegistryItem<Capsule>;
