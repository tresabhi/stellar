import { ReactComponent as CapsuleIconPrimitive } from 'assets/icons/capsule.svg';
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

export const CapsuleLayoutComponent = createPhysicalPart(model);

export const CapsuleIcon = CapsuleIconPrimitive;

export const registry: PartRegistryItem<Capsule> = {
  category: PartCategory.Structural,
  vanillaData: VanillaCapsuleData,
  data: CapsuleData,

  Icon: CapsuleIcon,
  PropertyEditor: undefined,
  Mesh: CapsuleLayoutComponent,

  exportify: undefined,
};
