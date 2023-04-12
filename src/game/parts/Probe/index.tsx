import { ReactComponent as Icon } from 'assets/icons/probe.svg';
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

export interface VanillaProbe extends VanillaPart, PartWithTransformations {
  readonly n: 'Probe';
  N: { width: number };
}

export interface Probe extends PartWithoutName, VanillaProbe {}

export const vanillaProbeData: VanillaProbe = {
  ...vanillaPartData,
  ...partWithTransformationsData,

  n: 'Probe',
  N: { width: 2 },
};

export const probeData: Probe = {
  ...partData,
  ...vanillaProbeData,
};

const LayoutComponent = createPhysicalPart(model);

export default {
  category: PartCategory.Structural,
  vanillaData: vanillaProbeData,
  data: probeData,
  label: 'probe',

  Icon,
  LayoutComponent,
} as PartRegistryItem<Probe>;
