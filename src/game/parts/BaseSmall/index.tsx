import { useTexture } from '@react-three/drei';
import { invalidate } from '@react-three/fiber';
import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import { BaseSmallEditDetail } from 'components/Canvas/components/EditControls/components/BaseSmall';
import * as Properties from 'components/Properties';
import declareBoundsUpdated from 'core/bounds/declareBoundsUpdated';
import getPart from 'core/part/getPart';
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
import { BOTTOM_WIDTH, constructBaseSideGeometry } from '../Base';
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

export interface VanillaBaseSmall extends VanillaPart, PartWithTransformations {
  readonly n: 'Base Small';
  N: PartWithFuelN & {
    width: number;
    height: number;
  };
}

export interface BaseSmall extends PartWithoutName, VanillaBaseSmall {}

export const vanillaBaseSmallData: VanillaBaseSmall = {
  ...vanillaPartData,
  ...partWithTransformationsData,

  n: 'Base Small',
  N: {
    ...partWithFuelData.N,

    width: 1,
    height: 1,
  },
};

export const baseSmallData: BaseSmall = {
  ...partData,
  ...vanillaBaseSmallData,
};

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
    (state: BaseSmall) => state.N,
    (N) => {
      if (
        meshBaseTop.current &&
        meshBaseMiddle.current &&
        meshBaseBottom.current &&
        meshLeftSupportTop1.current &&
        meshLeftSupportTop2.current &&
        meshLeftSupportMiddle.current &&
        meshLeftSupportBottom.current &&
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
          { ...N, extra: 0 },
          -1,
          meshLeftSupportTop1.current,
          meshLeftSupportTop2.current,
          meshLeftSupportMiddle.current,
          meshLeftSupportBottom.current,
        );
        constructBaseSideGeometry(
          { ...N, extra: 0 },
          1,
          meshRightSupportTop1.current,
          meshRightSupportTop2.current,
          meshRightSupportMiddle.current,
          meshRightSupportBottom.current,
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
        meshBaseTop.current &&
        meshBaseMiddle.current &&
        meshBaseBottom.current &&
        meshLeftSupportTop1.current &&
        meshLeftSupportTop2.current &&
        meshLeftSupportMiddle.current &&
        meshLeftSupportBottom.current &&
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
          { ...event.detail, extra: 0 },
          -1,
          meshLeftSupportTop1.current,
          meshLeftSupportTop2.current,
          meshLeftSupportMiddle.current,
          meshLeftSupportBottom.current,
        );
        constructBaseSideGeometry(
          { ...event.detail, extra: 0 },
          1,
          meshRightSupportTop1.current,
          meshRightSupportTop2.current,
          meshRightSupportMiddle.current,
          meshRightSupportBottom.current,
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
    </Properties.Group>
  );
}

export default {
  category: PartCategory.Structural,
  vanillaData: vanillaBaseSmallData,
  data: baseSmallData,
  label: 'base_small',

  Icon,
  LayoutComponent,
} as PartRegistryItem<BaseSmall>;
