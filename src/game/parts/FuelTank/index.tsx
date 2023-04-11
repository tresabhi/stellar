import { Link1Icon, LinkNone1Icon } from '@radix-ui/react-icons';
import { useTexture } from '@react-three/drei';
import { invalidate } from '@react-three/fiber';
import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import { FuelTankEditDetail } from 'components/Canvas/components/EditControls/components/FuelTankControls';
import * as Properties from 'components/Properties';
import mutateSettings from 'core/app/mutateSettings';
import declareBoundsUpdated from 'core/bounds/declareBoundsUpdated';
import getPart from 'core/part/getPart';
import removeMetaData from 'core/part/removeMetaData';
import PartCategory from 'hooks/constants/partCategory';
import useNumericalInputProperty from 'hooks/propertyControllers/useNumericalInputProperty';
import useSliderProperty from 'hooks/propertyControllers/useSliderProperty';
import usePhysicalPart from 'hooks/usePartPhysical';
import usePartProperty from 'hooks/usePartProperty';
import useTranslator from 'hooks/useTranslator';
import { cloneDeep } from 'lodash';
import { useEffect, useRef } from 'react';
import boundsStore from 'stores/bounds';
import { PartExportifier, PartRegistryItem } from 'stores/partRegistry';
import useSettings from 'stores/settings';
import { BufferGeometry, CylinderGeometry, Group, Mesh } from 'three';
import { PartComponentProps, PartPropertyComponentProps } from 'types/Parts';
import preloadTexture from 'utilities/preloadTexture';
import { PartData, PartWithoutName } from '../Part';
import {
  VanillaPartWithTexture,
  VanillaPartWithTextureData,
} from '../PartWithTexture';
import {
  VanillaPartWithTransformations,
  VanillaPartWithTransformationsData,
} from '../PartWithTransformations';
import defaultTexture from './textures/default.png';
import topTexture from './textures/top.png';

export interface VanillaFuelTank
  extends VanillaPartWithTexture,
    VanillaPartWithTransformations {
  readonly n: 'Fuel Tank';
  N: {
    width_original: number;
    width_a: number;
    width_b: number;
    height: number;
    fuel_percent: number;
  };
}

export interface FuelTank extends PartWithoutName, VanillaFuelTank {}

export const VanillaFuelTankData: VanillaFuelTank = {
  ...VanillaPartWithTransformationsData,
  ...VanillaPartWithTextureData,

  n: 'Fuel Tank',
  N: {
    width_original: 1,
    width_a: 1,
    width_b: 1,
    height: 1,
    fuel_percent: 1,
  },
};

export const FuelTankData: FuelTank = {
  ...PartData,
  ...VanillaFuelTankData,
};

function constructGeometry(
  N: FuelTankEditDetail,
  meshTop: Mesh,
  meshMiddle: Mesh,
  meshBottom: Mesh,
) {
  if (N.height > 0) {
    const slope = (height: number) =>
      (N.width_a + (N.width_b - N.width_a) * (height / N.height)) / 2;
    const topHeight = N.height < 0.3 ? N.height / 3 : 0.1;
    const bottomHeight = topHeight;
    const middleHeight = N.height - topHeight - bottomHeight;

    meshBottom.position.set(0, bottomHeight / 2, 0);
    meshMiddle.position.set(0, bottomHeight + middleHeight / 2, 0);
    meshTop.position.set(0, N.height - topHeight / 2, 0);

    meshBottom.geometry = new CylinderGeometry(
      slope(bottomHeight),
      N.width_a / 2,
      bottomHeight,
      12,
      1,
      true,
      -Math.PI / 2,
      Math.PI,
    );
    meshMiddle.geometry = new CylinderGeometry(
      slope(middleHeight + bottomHeight),
      slope(bottomHeight),
      middleHeight,
      12,
      1,
      true,
      -Math.PI / 2,
      Math.PI,
    );
    meshTop.geometry = new CylinderGeometry(
      N.width_b / 2,
      slope(middleHeight + bottomHeight),
      topHeight,
      12,
      1,
      true,
      -Math.PI / 2,
      Math.PI,
    );
  } else {
    // give them no geometry
    meshBottom.geometry = new BufferGeometry();
    meshMiddle.geometry = new BufferGeometry();
    meshTop.geometry = new BufferGeometry();
  }
}

preloadTexture(defaultTexture);
preloadTexture(topTexture);
function LayoutComponent({ id }: PartComponentProps) {
  const wrapper = useRef<Group>(null);
  const meshTop = useRef<Mesh>(null);
  const meshMiddle = useRef<Mesh>(null);
  const meshBottom = useRef<Mesh>(null);
  const props = usePhysicalPart(id, wrapper);
  const defaultColorMap = useTexture(defaultTexture);
  const topColorMap = useTexture(topTexture);

  usePartProperty(
    id,
    (newState: FuelTank) => newState.N,
    (N) => {
      if (meshTop.current && meshMiddle.current && meshBottom.current) {
        constructGeometry(
          N,
          meshTop.current,
          meshMiddle.current,
          meshBottom.current,
        );

        if (boundsStore[id] && wrapper.current) {
          const { o } = getPart<FuelTank>(id);
          const { bounds } = boundsStore[id];
          const width = Math.max(N.width_a, N.width_b) * o.x;
          const height = N.height * o.y;
          const offset = height / 2;
          const offsetRotation = wrapper.current.rotation.z + Math.PI / 2;
          const offsetX = offset * Math.cos(offsetRotation);
          const offsetY = offset * Math.sin(offsetRotation);
          const x = wrapper.current.position.x + offsetX;
          const y = wrapper.current.position.y + offsetY;

          bounds.x = x;
          bounds.y = y;
          bounds.width = width;
          bounds.height = height;

          declareBoundsUpdated(id);
        }

        invalidate();
      }
    },
  );

  useEffect(() => {
    const handleFuelTankEdit = (event: CustomEvent<FuelTankEditDetail>) => {
      if (meshTop.current && meshMiddle.current && meshBottom.current) {
        constructGeometry(
          event.detail,
          meshTop.current,
          meshMiddle.current,
          meshBottom.current,
        );

        invalidate();
      }
    };

    window.addEventListener(
      `fueltankedit${id}`,
      handleFuelTankEdit as EventListener,
    );

    return () => {
      window.removeEventListener(
        `fueltankedit${id}`,
        handleFuelTankEdit as EventListener,
      );
    };
  }, [id]);

  return (
    <group ref={wrapper} {...props}>
      <mesh ref={meshTop}>
        <meshBasicMaterial map={topColorMap} />
      </mesh>
      <mesh ref={meshMiddle}>
        <meshBasicMaterial map={defaultColorMap} />
      </mesh>
      <mesh ref={meshBottom}>
        <meshBasicMaterial map={defaultColorMap} color="#e4e4e4" />
      </mesh>
    </group>
  );
}

export function FuelTankProperties({ ids }: PartPropertyComponentProps) {
  const { t } = useTranslator();
  const constrain = useSettings(
    (state) => state.editor.constrainFuelTankWidths,
  );
  const topWidth = useNumericalInputProperty<FuelTank>(
    ids,
    (state) => state.N.width_b,
    (draft, newValue, lastValue) => {
      draft.N.width_b = newValue;

      if (constrain && lastValue !== undefined && lastValue !== 0) {
        draft.N.width_a *= newValue / lastValue;
      }
    },
  );
  const bottomWidth = useNumericalInputProperty<FuelTank>(
    ids,
    (state) => state.N.width_a,
    (draft, newValue, lastValue) => {
      draft.N.width_a = newValue;

      if (constrain && lastValue !== undefined && lastValue !== 0) {
        draft.N.width_b *= newValue / lastValue;
        draft.N.width_original = draft.N.width_b;
      }
    },
  );
  const height = useNumericalInputProperty<FuelTank>(
    ids,
    (state) => state.N.height,
    (draft, value) => {
      draft.N.height = value;
    },
  );
  const fuel = useSliderProperty<FuelTank>(
    ids,
    (state) => state.N.fuel_percent * 100,
    (draft, value) => {
      draft.N.fuel_percent = value / 100;
    },
  );

  const handleConstrainClick = () => {
    mutateSettings((draft) => {
      draft.editor.constrainFuelTankWidths =
        !draft.editor.constrainFuelTankWidths;
    });
  };

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.fuel_tank`}</Properties.Title>

      <Properties.Row>
        <Properties.Input
          {...height}
          label={t`tabs.layout.right_sidebar.properties.fuel_tank.height`}
          unit="m"
        />
      </Properties.Row>

      <Properties.Row>
        <Properties.Input
          {...topWidth}
          label={t`tabs.layout.right_sidebar.properties.fuel_tank.top_width`}
          unit="m"
        />
        <Properties.Input
          {...bottomWidth}
          label={t`tabs.layout.right_sidebar.properties.fuel_tank.bottom_width`}
          unit="m"
        />
        <Properties.ToggleButton
          label={t`tabs.layout.right_sidebar.properties.fuel_tank.constrain`}
          hint={t`tabs.layout.right_sidebar.properties.fuel_tank.constrain.hint`}
          onClick={handleConstrainClick}
          selected={constrain}
        >
          {constrain ? <Link1Icon /> : <LinkNone1Icon />}
        </Properties.ToggleButton>
      </Properties.Row>

      <Properties.Row>
        <Properties.SliderWithInput
          {...fuel}
          label={t`tabs.layout.right_sidebar.properties.fuel_tank.fuel`}
          unit="%"
          min={0}
          max={100}
        />
      </Properties.Row>
    </Properties.Group>
  );
}

export const fuelTankExportify: PartExportifier<FuelTank> = (part) => {
  const exportedPart = removeMetaData(part) as VanillaFuelTank;
  const partCap = cloneDeep(exportedPart);

  exportedPart.N.width_original = exportedPart.N.width_b;
  partCap.N.width_original = exportedPart.N.width_a;
  partCap.N.width_a = exportedPart.N.width_a;
  partCap.N.width_b = exportedPart.N.width_a;
  partCap.N.height = 0;

  return exportedPart.N.width_original === exportedPart.N.width_a &&
    exportedPart.N.width_original === exportedPart.N.width_b
    ? exportedPart
    : [exportedPart, partCap];
};

export default {
  category: PartCategory.Structural,
  vanillaData: VanillaFuelTankData,
  data: FuelTankData,
  label: 'fuel_tank',

  Icon,
  LayoutComponent,

  exportify: fuelTankExportify,
} as PartRegistryItem<FuelTank>;
