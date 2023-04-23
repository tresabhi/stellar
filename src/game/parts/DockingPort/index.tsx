import { useGLTF } from '@react-three/drei';
import { invalidate } from '@react-three/fiber';
import { ReactComponent as Icon } from 'assets/icons/docking-port.svg';
import * as Properties from 'components/Properties';
import declareBoundsUpdated from 'core/bounds/declareBoundsUpdated';
import getPart from 'core/part/getPart';
import PartCategory from 'hooks/constants/partCategory';
import useNumericalInputProperty from 'hooks/propertyControllers/useNumericalInputProperty';
import useSliderProperty from 'hooks/propertyControllers/useSliderProperty';
import useModel from 'hooks/useModel';
import usePhysicalPart from 'hooks/usePartPhysical';
import usePartProperty from 'hooks/usePartProperty';
import useTranslator from 'hooks/useTranslator';
import { useRef } from 'react';
import boundsStore from 'stores/bounds';
import { PartRegistryItem } from 'stores/partRegistry';
import { Group } from 'three';
import { PartComponentProps, PartPropertyComponentProps } from 'types/Parts';
import {
  PartWithoutName,
  VanillaPart,
  partData,
  vanillaPartData,
} from '../Part';
import { PartWithStages, partWithStagesData } from '../PartWithStages';
import {
  PartWithTransformations,
  partWithTransformationsData,
} from '../PartWithTransformations';
import bottomModel from './models/bottom.gltf';
import middleModel from './models/middle.gltf';
import topModel from './models/top.gltf';

export interface VanillaDockingPort
  extends VanillaPart,
    PartWithTransformations {
  readonly n: 'Docking Port';
  N: { width: number; force_multiplier: number; sep_force_multiplier: number };
}

export interface DockingPort
  extends PartWithoutName,
    PartWithStages,
    VanillaDockingPort {}

export const vanillaDockingPortData: VanillaDockingPort = {
  ...vanillaPartData,
  ...partWithTransformationsData,

  n: 'Docking Port',
  N: { width: 0.95, force_multiplier: 0.5, sep_force_multiplier: 0.5 },
};

export const dockingPortData: DockingPort = {
  ...partData,
  ...partWithStagesData,
  ...vanillaDockingPortData,
};

useGLTF.preload(topModel);
useGLTF.preload(middleModel);
useGLTF.preload(bottomModel);
function LayoutComponent({ id }: PartComponentProps) {
  const { width } = getPart<DockingPort>(id).N;
  const wrapper = useRef<Group>(null);
  const props = usePhysicalPart(id, wrapper);
  const topMesh = useModel(topModel);
  const middleMesh = useModel(middleModel);
  const bottomMesh = useModel(bottomModel);
  const topGroup = useRef<Group>(null);
  const middleGroup = useRef<Group>(null);
  const bottomGroup = useRef<Group>(null);

  usePartProperty(
    id,
    (state: DockingPort) => state.N.width,
    (newWidth, oldWidth) => {
      const topWidth = newWidth - 3 / 10;
      const middleWidth = newWidth - 1 / 10;
      const bottomWidth = newWidth - 2 / 10;

      topGroup.current?.scale.set(topWidth, 1, topWidth);
      middleGroup.current?.scale.set(middleWidth, 1, middleWidth);
      bottomGroup.current?.scale.set(bottomWidth, 1, bottomWidth);

      boundsStore[id].bounds.width *= (newWidth - 1 / 10) / (oldWidth - 1 / 10);

      declareBoundsUpdated(id);
      invalidate();
    },
  );

  return (
    <group ref={wrapper} {...props}>
      <group ref={topGroup} scale={[width - 3 / 10, 1, width - 3 / 10]}>
        {topMesh}
      </group>
      <group ref={middleGroup} scale={[width - 1 / 10, 1, width - 1 / 10]}>
        {middleMesh}
      </group>
      <group ref={bottomGroup} scale={[width - 2 / 10, 1, width - 2 / 10]}>
        {bottomMesh}
      </group>
    </group>
  );
}

export function DockingPortProperties({ ids }: PartPropertyComponentProps) {
  const { t } = useTranslator();
  const width = useNumericalInputProperty<DockingPort>(
    ids,
    (state) => state.N.width,
    (draft, newValue) => {
      draft.N.width = newValue;
    },
  );
  const magneticForce = useSliderProperty<DockingPort>(
    ids,
    (state) => state.N.force_multiplier * 100,
    (draft, value) => {
      draft.N.force_multiplier = value / 100;
    },
  );
  const separationForce = useSliderProperty<DockingPort>(
    ids,
    (state) => state.N.sep_force_multiplier * 100,
    (draft, value) => {
      draft.N.sep_force_multiplier = value / 100;
    },
  );

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.docking_port`}</Properties.Title>
      <Properties.Row>
        <Properties.Input
          {...width}
          label={t`tabs.layout.right_sidebar.properties.docking_port.width`}
          unit="m"
        />
      </Properties.Row>

      <Properties.Row>
        <Properties.SliderWithInput
          {...magneticForce}
          label={t`tabs.layout.right_sidebar.properties.docking_port.magnetic_force`}
          unit="%"
          min={0}
          max={100}
        />
      </Properties.Row>

      <Properties.Row>
        <Properties.SliderWithInput
          {...separationForce}
          label={t`tabs.layout.right_sidebar.properties.docking_port.separation_force`}
          unit="%"
          min={0}
          max={100}
        />
      </Properties.Row>
    </Properties.Group>
  );
}

export default {
  category: PartCategory.Aerodynamic,
  vanillaData: vanillaDockingPortData,
  data: dockingPortData,
  label: 'docking_port',

  Icon,
  LayoutComponent,
} as PartRegistryItem<DockingPort>;
