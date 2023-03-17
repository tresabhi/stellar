import { ReactComponent as ProbeIconPrimitive } from 'assets/icons/probe.svg';
import PartCategory from 'hooks/constants/partCategory';
import { PartRegistryItem } from 'stores/partRegistry';
import createPhysicalPart from 'utilities/createPhysicalPart';
import { PartData, PartWithoutName } from '../Part';
import {
  VanillaPartWithTransformations,
  VanillaPartWithTransformationsData,
} from '../PartWithTransformations';
import model from './model.gltf';

export interface VanillaProbe extends VanillaPartWithTransformations {
  readonly n: 'Probe';
  N: { width: number };
}

export interface Probe extends PartWithoutName, VanillaProbe {}

export const VanillaProbeData: VanillaProbe = {
  ...VanillaPartWithTransformationsData,

  n: 'Probe',
  N: { width: 2 },
};

export const ProbeData: Probe = {
  ...PartData,
  ...VanillaProbeData,

  label: 'Probe',
};

export const ProbeLayoutComponent = createPhysicalPart(model);

export const ProbeIcon = ProbeIconPrimitive;

export const registry: PartRegistryItem<Probe> = {
  category: PartCategory.Structural,
  vanillaData: VanillaProbeData,
  data: ProbeData,

  Icon: ProbeIcon,
  Mesh: ProbeLayoutComponent,

  exportify: undefined,
};