import { useTexture } from '@react-three/drei';
import { invalidate } from '@react-three/fiber';
import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import { BaseEditDetail } from 'components/Canvas/components/EditControls/components/Base';
import * as Properties from 'components/Properties';
import declareBoundsUpdated from 'core/bounds/declareBoundsUpdated';
import getPart from 'core/part/getPart';
import { FuelTankGeometry } from 'geometries/FuelTankGeometry';
import PartCategory from 'hooks/constants/partCategory';
import useNumericalInputProperty from 'hooks/propertyControllers/useNumericalInputProperty';
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
import edgeBright from '../FuelTank/textures/edge-bright.png';
import edge from '../FuelTank/textures/edge.png';
import middle from '../FuelTank/textures/middle.png';
import {
  PartWithoutName,
  VanillaPart,
  partData,
  vanillaPartData,
} from '../Part';
import { PartWithFuelN, partWithFuelData } from '../PartWithFuel';
import {
  PartWithTransformations,
  partWithTransformationsData,
} from '../PartWithTransformations';

export interface VanillaBase extends VanillaPart, PartWithTransformations {
  readonly n: 'Base';
  N: PartWithFuelN & {
    width: number;
    height: number;
    extra: number;
  };
}

export interface Base extends PartWithoutName, VanillaBase {}

export const vanillaBaseData: VanillaBase = {
  ...vanillaPartData,
  ...partWithTransformationsData,

  n: 'Base',
  N: {
    ...partWithFuelData.N,

    width: 1,
    height: 1,
    extra: 0,
  },
};

export const baseData: Base = {
  ...partData,
  ...vanillaBaseData,
};

const TOP_HEIGHT = 1 / 10;
const TOP_1_HEIGHT = 4 / 100;
const TOP_2_HEIGHT = TOP_HEIGHT - TOP_1_HEIGHT;
const TOP_TOP_WIDTH = 8 / 100;
const TOP_BOTTOM_WIDTH = 2 / 10;
const TOP_SLOPE = (TOP_BOTTOM_WIDTH - TOP_TOP_WIDTH) / TOP_HEIGHT;
const TOP_BETWEEN_WIDTH = TOP_SLOPE * TOP_1_HEIGHT + TOP_TOP_WIDTH;
const BOTTOM_HEIGHT = 6 / 100;
export const BOTTOM_WIDTH = 5 / 10;

export function constructBaseSideGeometry(
  N: BaseEditDetail,
  side: number,
  meshTop1: Mesh,
  meshTop2: Mesh,
  meshMiddle: Mesh,
  meshBottom: Mesh,
) {
  // one case situation
  const z = side === 0 ? N.width / 2 : 0;
  const extra = side === 0 ? 0 : N.extra / 2;

  meshTop1.position.set(side * (N.width / 2), N.height - TOP_1_HEIGHT / 2, z);
  meshTop2.position.set(
    side * (N.width / 2),
    N.height - TOP_HEIGHT + TOP_2_HEIGHT / 2,
    z,
  );
  meshMiddle.position.set(
    side * (N.width / 2),
    BOTTOM_HEIGHT + (N.height - TOP_HEIGHT - BOTTOM_HEIGHT) / 2,
    z,
  );
  meshBottom.position.set(side * (N.width / 2), BOTTOM_HEIGHT / 2, z);

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
    N.width * (BOTTOM_WIDTH / 2) + extra,
    N.height - TOP_HEIGHT - BOTTOM_HEIGHT,
  );
  meshBottom.geometry = new FuelTankGeometry(
    N.width * (BOTTOM_WIDTH / 2) + extra,
    N.width * (BOTTOM_WIDTH / 2) + extra,
    BOTTOM_HEIGHT,
  );
}

preloadTexture(middle);
preloadTexture(edge);
preloadTexture(edgeBright);
function LayoutComponent({ id }: PartComponentProps) {
  const wrapper = useRef<Group>(null);
  const meshBaseTop = useRef<Mesh>(null);
  const meshBaseMiddle = useRef<Mesh>(null);
  const meshBaseBottom = useRef<Mesh>(null);
  const meshLeftSupportTop1 = useRef<Mesh>(null);
  const meshLeftSupportTop2 = useRef<Mesh>(null);
  const meshLeftSupportMiddle = useRef<Mesh>(null);
  const meshLeftSupportBottom = useRef<Mesh>(null);
  const meshMiddleSupportTop1 = useRef<Mesh>(null);
  const meshMiddleSupportTop2 = useRef<Mesh>(null);
  const meshMiddleSupportMiddle = useRef<Mesh>(null);
  const meshMiddleSupportBottom = useRef<Mesh>(null);
  const meshRightSupportTop1 = useRef<Mesh>(null);
  const meshRightSupportTop2 = useRef<Mesh>(null);
  const meshRightSupportMiddle = useRef<Mesh>(null);
  const meshRightSupportBottom = useRef<Mesh>(null);
  const props = usePhysicalPart(id, wrapper);
  const middleTexture = useTexture(middle);
  const edgeTexture = useTexture(edge);
  const edgeBrightTexture = useTexture(edgeBright);

  middleTexture.magFilter = NearestFilter;

  usePartProperty(
    id,
    (state: Base) => state.N,
    (N) => {
      if (
        meshBaseTop.current &&
        meshBaseMiddle.current &&
        meshBaseBottom.current &&
        meshLeftSupportTop1.current &&
        meshLeftSupportTop2.current &&
        meshLeftSupportMiddle.current &&
        meshLeftSupportBottom.current &&
        meshMiddleSupportTop1.current &&
        meshMiddleSupportTop2.current &&
        meshMiddleSupportMiddle.current &&
        meshMiddleSupportBottom.current &&
        meshRightSupportTop1.current &&
        meshRightSupportTop2.current &&
        meshRightSupportMiddle.current &&
        meshRightSupportBottom.current
      ) {
        constructFuelTankGeometry(
          {
            height: N.height,
            width_a: N.width,
            width_b: N.width,
          },
          meshBaseTop.current,
          meshBaseMiddle.current,
          meshBaseBottom.current,
        );
        constructBaseSideGeometry(
          N,
          -1,
          meshLeftSupportTop1.current,
          meshLeftSupportTop2.current,
          meshLeftSupportMiddle.current,
          meshLeftSupportBottom.current,
        );
        constructBaseSideGeometry(
          N,
          0,
          meshMiddleSupportTop1.current,
          meshMiddleSupportTop2.current,
          meshMiddleSupportMiddle.current,
          meshMiddleSupportBottom.current,
        );
        constructBaseSideGeometry(
          N,
          1,
          meshRightSupportTop1.current,
          meshRightSupportTop2.current,
          meshRightSupportMiddle.current,
          meshRightSupportBottom.current,
        );

        if (boundsStore[id] && wrapper.current) {
          const { o } = getPart<Base>(id);
          const { bounds } = boundsStore[id];
          // TODO: idk where to derive 0.8 from but it works
          const width =
            (N.width + N.width * BOTTOM_WIDTH + Math.max(N.extra, -0.8)) * o.x;
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
    const handleBaseEdit = (event: CustomEvent<BaseEditDetail>) => {
      if (
        meshBaseTop.current &&
        meshBaseMiddle.current &&
        meshBaseBottom.current &&
        meshLeftSupportTop1.current &&
        meshLeftSupportTop2.current &&
        meshLeftSupportMiddle.current &&
        meshLeftSupportBottom.current &&
        meshMiddleSupportTop1.current &&
        meshMiddleSupportTop2.current &&
        meshMiddleSupportMiddle.current &&
        meshMiddleSupportBottom.current &&
        meshRightSupportTop1.current &&
        meshRightSupportTop2.current &&
        meshRightSupportMiddle.current &&
        meshRightSupportBottom.current
      ) {
        constructFuelTankGeometry(
          {
            height: event.detail.height,
            width_a: event.detail.width,
            width_b: event.detail.width,
          },
          meshBaseTop.current,
          meshBaseMiddle.current,
          meshBaseBottom.current,
        );
        constructBaseSideGeometry(
          event.detail,
          -1,
          meshLeftSupportTop1.current,
          meshLeftSupportTop2.current,
          meshLeftSupportMiddle.current,
          meshLeftSupportBottom.current,
        );
        constructBaseSideGeometry(
          event.detail,
          0,
          meshMiddleSupportTop1.current,
          meshMiddleSupportTop2.current,
          meshMiddleSupportMiddle.current,
          meshMiddleSupportBottom.current,
        );
        constructBaseSideGeometry(
          event.detail,
          1,
          meshRightSupportTop1.current,
          meshRightSupportTop2.current,
          meshRightSupportMiddle.current,
          meshRightSupportBottom.current,
        );

        invalidate();
      }
    };

    window.addEventListener(`baseedit${id}`, handleBaseEdit as EventListener);

    return () => {
      window.removeEventListener(
        `baseedit${id}`,
        handleBaseEdit as EventListener,
      );
    };
  }, [id]);

  return (
    <group ref={wrapper} {...props}>
      <mesh ref={meshBaseTop}>
        <meshBasicMaterial map={edgeBrightTexture} />
      </mesh>
      <mesh ref={meshBaseMiddle}>
        <meshBasicMaterial map={middleTexture} />
      </mesh>
      <mesh ref={meshBaseBottom}>
        <meshBasicMaterial map={edgeTexture} color="#e4e4e4" />
      </mesh>

      <mesh ref={meshLeftSupportTop1}>
        <meshBasicMaterial map={edgeBrightTexture} />
      </mesh>
      <mesh ref={meshLeftSupportTop2}>
        <meshBasicMaterial map={middleTexture} />
      </mesh>
      <mesh ref={meshLeftSupportMiddle}>
        <meshBasicMaterial map={middleTexture} />
      </mesh>
      <mesh ref={meshLeftSupportBottom}>
        <meshBasicMaterial map={edgeTexture} color="#e4e4e4" />
      </mesh>

      <mesh ref={meshMiddleSupportTop1}>
        <meshBasicMaterial map={edgeBrightTexture} />
      </mesh>
      <mesh ref={meshMiddleSupportTop2}>
        <meshBasicMaterial map={middleTexture} />
      </mesh>
      <mesh ref={meshMiddleSupportMiddle}>
        <meshBasicMaterial map={middleTexture} />
      </mesh>
      <mesh ref={meshMiddleSupportBottom}>
        <meshBasicMaterial map={edgeTexture} color="#e4e4e4" />
      </mesh>

      <mesh ref={meshRightSupportTop1}>
        <meshBasicMaterial map={edgeBrightTexture} />
      </mesh>
      <mesh ref={meshRightSupportTop2}>
        <meshBasicMaterial map={middleTexture} />
      </mesh>
      <mesh ref={meshRightSupportMiddle}>
        <meshBasicMaterial map={middleTexture} />
      </mesh>
      <mesh ref={meshRightSupportBottom}>
        <meshBasicMaterial map={edgeTexture} color="#e4e4e4" />
      </mesh>
    </group>
  );
}

export function BaseProperties({ ids }: PartPropertyComponentProps) {
  const { t } = useTranslator();
  const height = useNumericalInputProperty<Base>(
    ids,
    (state) => state.N.height,
    (draft, value) => {
      draft.N.height = value;
    },
  );
  const width = useNumericalInputProperty<Base>(
    ids,
    (state) => state.N.width,
    (draft, value) => {
      draft.N.width = value;
    },
  );
  const extra = useNumericalInputProperty<Base>(
    ids,
    (state) => state.N.extra,
    (draft, value) => {
      draft.N.extra = value;
    },
  );

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.base`}</Properties.Title>

      <Properties.Row>
        <Properties.Input
          {...width}
          label={t`tabs.layout.right_sidebar.properties.base.width`}
          unit="m"
        />
        <Properties.Input
          {...height}
          label={t`tabs.layout.right_sidebar.properties.base.height`}
          unit="m"
        />
        <Properties.Input
          {...extra}
          label={t`tabs.layout.right_sidebar.properties.base.extra`}
          unit="m"
        />
      </Properties.Row>
    </Properties.Group>
  );
}

export default {
  category: PartCategory.Structural,
  vanillaData: vanillaBaseData,
  data: baseData,
  label: 'base',

  Icon,
  LayoutComponent,
} as PartRegistryItem<Base>;
