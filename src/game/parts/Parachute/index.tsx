import { useGLTF } from '@react-three/drei';
import { ReactComponent as EngineIcon } from 'assets/icons/parachute.svg';
import PartCategory from 'hooks/constants/partCategory';
import usePart from 'hooks/usePart';
import { PartRegistryItem } from 'stores/partRegistry';
import { PartComponentProps } from 'types/Parts';
import createPhysicalPart from 'utilities/createPhysicalPart';
import { PartData, PartWithoutName } from '../Part';
import {
  VanillaPartWithParachute,
  VanillaPartWithParachuteData,
} from '../PartWithParachute';
import {
  VanillaPartWithTransformations,
  VanillaPartWithTransformationsData,
} from '../PartWithTransformations';
import regularModel from './models/default.gltf';
import deployedModel from './models/deployed.gltf';

export interface VanillaParachute
  extends VanillaPartWithTransformations,
    VanillaPartWithParachute {
  readonly n: 'Parachute';
}

export interface Parachute extends PartWithoutName, VanillaParachute {}

export const VanillaParachuteData: VanillaParachute = {
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithParachuteData,

  n: 'Parachute',
};

export const ParachuteData: Parachute = {
  ...PartData,
  ...VanillaParachuteData,

  label: 'Parachute',
};

useGLTF.preload(regularModel);
useGLTF.preload(deployedModel);
export function ParachuteLayoutComponent({ id, ...props }: PartComponentProps) {
  const deployState = usePart<Parachute>(id).N.deploy_state;
  const Component = createPhysicalPart(
    deployState === 0 ? regularModel : deployedModel,
  );

  return <Component id={id} {...props} />;
}

export const ParachuteIcon = EngineIcon;

export const registry: PartRegistryItem<Parachute> = {
  category: PartCategory.Aerodynamic,
  vanillaData: VanillaParachuteData,
  data: ParachuteData,

  Icon: ParachuteIcon,
  Mesh: ParachuteLayoutComponent,

  exportify: undefined,
};
