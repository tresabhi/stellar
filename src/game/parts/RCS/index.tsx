import { ReactComponent as Icon } from 'assets/icons/reaction-control-system.svg';
import PartCategory from 'hooks/constants/partCategory';
import { PartRegistryItem } from 'stores/partRegistry';
import createPhysicalPart from 'utilities/createPhysicalPart';
import { PartData, PartWithoutName } from '../Part';
import {
  VanillaPartWithTransformations,
  VanillaPartWithTransformationsData,
} from '../PartWithTransformations';
import model from './model.gltf';

export interface VanillaRCS extends VanillaPartWithTransformations {
  readonly n: 'RCS';
}

export interface RCS extends PartWithoutName, VanillaRCS {}

export const VanillaRCSData: VanillaRCS = {
  ...VanillaPartWithTransformationsData,

  n: 'RCS',
};

export const RCSData: RCS = {
  ...PartData,
  ...VanillaRCSData,

  label: 'RCS',
};

export const RCSLayoutComponent = createPhysicalPart(model, false, true);

export const registry: PartRegistryItem<RCS> = {
  category: PartCategory.Structural,
  vanillaData: VanillaRCSData,
  data: RCSData,

  Icon,
  Mesh: RCSLayoutComponent,
};
