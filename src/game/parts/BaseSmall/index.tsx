import { useTexture } from '@react-three/drei';
import { invalidate } from '@react-three/fiber';
import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import { BaseSmallEditDetail } from 'components/Canvas/components/EditControls/components/BaseSmall';
import * as Properties from 'components/Properties';
import declareBoundsUpdated from 'core/bounds/declareBoundsUpdated';
import getPart from 'core/part/getPart';
import { FuelTankGeometry } from 'geometries/FuelTankGeometry';
import PartCategory from 'hooks/constants/partCategory';
import useNumericalInputProperty from 'hooks/propertyControllers/useNumericalInputProperty';
import useSliderProperty from 'hooks/propertyControllers/useSliderProperty';
import usePhysicalPart from 'hooks/usePartPhysical';
import usePartProperty from 'hooks/usePartProperty';
import useTranslator from 'hooks/useTranslator';
import { useEffect, useRef } from 'react';
import boundsStore from 'stores/bounds';
import { PartRegistryItem } from 'stores/partRegistry';
import { Group, Mesh, NearestFilter } from 'three';
import { PartComponentProps, PartPropertyComponentProps } from 'types/Parts';
import preloadTexture from 'utilities/preloadTexture';
import { constructFuelTankGeometry } from '../FuelTank';
import {
  PartWithoutName,
  VanillaPart,
  partData,
  vanillaPartData,
} from '../Part';
import {
  PartWithTransformations,
  partWithTransformationsData,
} from '../PartWithTransformations';
import edgeBright from './textures/edge-bright.png';
import edge from './textures/edge.png';
import middle from './textures/middle.png';

export interface VanillaBaseSmall extends VanillaPart, PartWithTransformations {
  readonly n: 'Base Small';
  N: {
    width: number;
    height: number;
    fuel_percent: number;
  };
}

export interface BaseSmall extends PartWithoutName, VanillaBaseSmall {}

export const vanillaBaseSmallData: VanillaBaseSmall = {
  ...vanillaPartData,
  ...partWithTransformationsData,

  n: 'Base Small',
  N: {
    width: 1,
    height: 1,
    fuel_percent: 1,
  },
};

export const BaseSmallData: BaseSmall = {
  ...partData,
  ...vanillaBaseSmallData,
};

const TOP_HEIGHT = 1 / 10;
const TOP_1_HEIGHT = 4 / 100;
const TOP_2_HEIGHT = TOP_HEIGHT - TOP_1_HEIGHT;
const TOP_TOP_WIDTH = 8 / 100;
const TOP_BOTTOM_WIDTH = 2 / 10;
const TOP_SLOPE = (TOP_BOTTOM_WIDTH - TOP_TOP_WIDTH) / TOP_HEIGHT;
const TOP_BETWEEN_WIDTH = TOP_SLOPE * TOP_1_HEIGHT + TOP_TOP_WIDTH;
const BOTTOM_HEIGHT = 6 / 100;
const BOTTOM_WIDTH = 5 / 10;

function constructBaseSmallSideGeometry(
  N: BaseSmallEditDetail,
  side: -1 | 1,
  meshTop1: Mesh,
  meshTop2: Mesh,
  meshMiddle: Mesh,
  meshBottom: Mesh,
) {
  meshTop1.position.set(side * (N.width / 2), N.height - TOP_1_HEIGHT / 2, 0);
  meshTop2.position.set(
    side * (N.width / 2),
    N.height - TOP_HEIGHT + TOP_2_HEIGHT / 2,
    0,
  );
  meshMiddle.position.set(
    side * (N.width / 2),
    BOTTOM_HEIGHT + (N.height - TOP_HEIGHT - BOTTOM_HEIGHT) / 2,
    0,
  );
  meshBottom.position.set(side * (N.width / 2), BOTTOM_HEIGHT / 2, 0);

  meshTop1.geometry = new FuelTankGeometry(
    TOP_TOP_WIDTH / 2,
    TOP_BETWEEN_WIDTH / 2,
    TOP_1_HEIGHT,
  );
  meshTop2.geometry = new FuelTankGeometry(
    TOP_BETWEEN_WIDTH / 2,
    TOP_BOTTOM_WIDTH / 2,
    TOP_2_HEIGHT,
  );
  meshMiddle.geometry = new FuelTankGeometry(
    TOP_BOTTOM_WIDTH / 2,
    N.width * (BOTTOM_WIDTH / 2),
    N.height - TOP_HEIGHT - BOTTOM_HEIGHT,
  );
  meshBottom.geometry = new FuelTankGeometry(
    N.width * (BOTTOM_WIDTH / 2),
    N.width * (BOTTOM_WIDTH / 2),
    BOTTOM_HEIGHT,
  );
}

preloadTexture(middle);
preloadTexture(edge);
preloadTexture(edgeBright);
function LayoutComponent({ id }: PartComponentProps) {
  const wrapper = useRef<Group>(null);
  const meshMiddleTop = useRef<Mesh>(null);
  const meshMiddleMiddle = useRef<Mesh>(null);
  const meshMiddleBottom = useRef<Mesh>(null);
  const meshLeftTop1 = useRef<Mesh>(null);
  const meshLeftTop2 = useRef<Mesh>(null);
  const meshLeftMiddle = useRef<Mesh>(null);
  const meshLeftBottom = useRef<Mesh>(null);
  const meshRightTop1 = useRef<Mesh>(null);
  const meshRightTop2 = useRef<Mesh>(null);
  const meshRightMiddle = useRef<Mesh>(null);
  const meshRightBottom = useRef<Mesh>(null);
  const props = usePhysicalPart(id, wrapper);
  const middleTexture = useTexture(middle);
  const edgeTexture = useTexture(edge);
  const edgeBrightTexture = useTexture(edgeBright);

  middleTexture.magFilter = NearestFilter;

  usePartProperty(
    id,
    (state: BaseSmall) => state.N,
    (N) => {
      if (
        meshMiddleTop.current &&
        meshMiddleMiddle.current &&
        meshMiddleBottom.current &&
        meshLeftTop1.current &&
        meshLeftTop2.current &&
        meshLeftMiddle.current &&
        meshLeftBottom.current &&
        meshRightTop1.current &&
        meshRightTop2.current &&
        meshRightMiddle.current &&
        meshRightBottom.current
      ) {
        constructFuelTankGeometry(
          {
            height: N.height,
            width_a: N.width,
            width_b: N.width,
          },
          meshMiddleTop.current,
          meshMiddleMiddle.current,
          meshMiddleBottom.current,
        );
        constructBaseSmallSideGeometry(
          N,
          -1,
          meshLeftTop1.current,
          meshLeftTop2.current,
          meshLeftMiddle.current,
          meshLeftBottom.current,
        );
        constructBaseSmallSideGeometry(
          N,
          1,
          meshRightTop1.current,
          meshRightTop2.current,
          meshRightMiddle.current,
          meshRightBottom.current,
        );

        if (boundsStore[id] && wrapper.current) {
          const { o } = getPart<BaseSmall>(id);
          const { bounds } = boundsStore[id];
          const width = N.width * (1 + BOTTOM_WIDTH) * o.x;
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
    const handleBaseSmallEdit = (event: CustomEvent<BaseSmallEditDetail>) => {
      if (
        meshMiddleTop.current &&
        meshMiddleMiddle.current &&
        meshMiddleBottom.current
      ) {
        constructFuelTankGeometry(
          {
            height: event.detail.height,
            width_a: event.detail.width,
            width_b: event.detail.width,
          },
          meshMiddleTop.current,
          meshMiddleMiddle.current,
          meshMiddleBottom.current,
        );

        invalidate();
      }
    };

    window.addEventListener(
      `basesmalledit${id}`,
      handleBaseSmallEdit as EventListener,
    );

    return () => {
      window.removeEventListener(
        `basesmalledit${id}`,
        handleBaseSmallEdit as EventListener,
      );
    };
  }, [id]);

  return (
    <group ref={wrapper} {...props}>
      <mesh ref={meshMiddleTop}>
        <meshBasicMaterial map={edgeBrightTexture} />
      </mesh>
      <mesh ref={meshMiddleMiddle}>
        <meshBasicMaterial map={middleTexture} />
      </mesh>
      <mesh ref={meshMiddleBottom}>
        <meshBasicMaterial map={edgeTexture} color="#e4e4e4" />
      </mesh>

      <mesh ref={meshLeftTop1}>
        <meshBasicMaterial map={edgeBrightTexture} />
      </mesh>
      <mesh ref={meshLeftTop2}>
        <meshBasicMaterial map={middleTexture} />
      </mesh>
      <mesh ref={meshLeftMiddle}>
        <meshBasicMaterial map={middleTexture} />
      </mesh>
      <mesh ref={meshLeftBottom}>
        <meshBasicMaterial map={edgeTexture} color="#e4e4e4" />
      </mesh>

      <mesh ref={meshRightTop1}>
        <meshBasicMaterial map={edgeBrightTexture} />
      </mesh>
      <mesh ref={meshRightTop2}>
        <meshBasicMaterial map={middleTexture} />
      </mesh>
      <mesh ref={meshRightMiddle}>
        <meshBasicMaterial map={middleTexture} />
      </mesh>
      <mesh ref={meshRightBottom}>
        <meshBasicMaterial map={edgeTexture} color="#e4e4e4" />
      </mesh>
    </group>
  );
}

export function BaseSmallProperties({ ids }: PartPropertyComponentProps) {
  const { t } = useTranslator();
  const height = useNumericalInputProperty<BaseSmall>(
    ids,
    (state) => state.N.height,
    (draft, value) => {
      draft.N.height = value;
    },
  );
  const width = useNumericalInputProperty<BaseSmall>(
    ids,
    (state) => state.N.width,
    (draft, value) => {
      draft.N.width = value;
    },
  );
  const fuel = useSliderProperty<BaseSmall>(
    ids,
    (state) => state.N.fuel_percent * 100,
    (draft, value) => {
      draft.N.fuel_percent = value / 100;
    },
  );

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.base_small`}</Properties.Title>

      <Properties.Row>
        <Properties.Input
          {...width}
          label={t`tabs.layout.right_sidebar.properties.base_small.width`}
          unit="m"
        />
        <Properties.Input
          {...height}
          label={t`tabs.layout.right_sidebar.properties.base_small.height`}
          unit="m"
        />
      </Properties.Row>

      <Properties.Row>
        <Properties.SliderWithInput
          {...fuel}
          label={t`tabs.layout.right_sidebar.properties.base_small.fuel`}
          unit="%"
          min={0}
          max={100}
        />
      </Properties.Row>
    </Properties.Group>
  );
}

export default {
  category: PartCategory.Structural,
  vanillaData: vanillaBaseSmallData,
  data: BaseSmallData,
  label: 'base_small',

  Icon,
  LayoutComponent,
} as PartRegistryItem<BaseSmall>;
