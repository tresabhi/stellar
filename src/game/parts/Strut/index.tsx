import { useTexture } from '@react-three/drei';
import { ReactComponent as Icon } from 'assets/icons/truss.svg';
import PartCategory from 'hooks/constants/partCategory';
import usePhysicalPart from 'hooks/usePartPhysical';
import { useRef } from 'react';
import { PartRegistryItem } from 'stores/partRegistry';
import { Group, Mesh } from 'three';
import { PartComponentProps } from 'types/Parts';
import preloadTexture from 'utilities/preloadTexture';
import {
  PartWithoutName,
  VanillaPart,
  partData,
  vanillaPartData,
} from '../Part';
import { PartWithStages, partWithStagesData } from '../PartWithStages';
import {
  PartWithStrut,
  partWithStrutData,
  usePartWithStrut,
} from '../PartWithStrut';
import {
  PartWithTransformations,
  partWithTransformationsData,
} from '../PartWithTransformations';
import strutBottom from './textures/strut-bottom.png';
import strutLeft from './textures/strut-left.png';
import strutMiddle from './textures/strut-middle.png';
import strutRight from './textures/strut-right.png';
import strutTop from './textures/strut-top.png';

export interface VanillaStrut
  extends VanillaPart,
    PartWithTransformations,
    PartWithStrut {
  readonly n: 'Strut';
}

export interface Strut extends PartWithoutName, PartWithStages, VanillaStrut {}

export const vanillaStrutData: VanillaStrut = {
  ...vanillaPartData,
  ...partWithTransformationsData,
  ...partWithStrutData,

  n: 'Strut',
};

export const strutData: Strut = {
  ...partData,
  ...partWithStagesData,
  ...vanillaStrutData,
};

preloadTexture(strutLeft);
preloadTexture(strutRight);
preloadTexture(strutTop);
preloadTexture(strutBottom);
preloadTexture(strutMiddle);
function LayoutComponent({ id }: PartComponentProps) {
  const wrapper = useRef<Group>(null);
  const props = usePhysicalPart(id, wrapper, false);
  const left = useRef<Mesh>(null);
  const right = useRef<Mesh>(null);
  const top = useRef<Mesh>(null);
  const bottom = useRef<Mesh>(null);
  const middle = useRef<Mesh>(null);
  const leftColorMap = useTexture(strutLeft);
  const rightColorMap = useTexture(strutRight);
  const topColorMap = useTexture(strutTop);
  const bottomColorMap = useTexture(strutBottom);
  const middleColorMap = useTexture(strutMiddle);

  usePartWithStrut(id, middleColorMap, top, right, bottom, left, middle);

  return (
    <group ref={wrapper} {...props}>
      <mesh ref={left}>
        <planeGeometry args={[0.125, 0.5]} />
        <meshBasicMaterial map={leftColorMap} />
      </mesh>
      <mesh ref={right}>
        <planeGeometry args={[0.125, 0.5]} />
        <meshBasicMaterial map={rightColorMap} />
      </mesh>
      <mesh ref={top}>
        <planeGeometry args={[1, 0.125]} />
        <meshBasicMaterial map={topColorMap} />
      </mesh>
      <mesh ref={bottom}>
        <planeGeometry args={[1, 0.125]} />
        <meshBasicMaterial map={bottomColorMap} />
      </mesh>
      <mesh ref={middle}>
        <planeGeometry args={[1, 0.5]} />
        <meshBasicMaterial map={middleColorMap} transparent />
      </mesh>
    </group>
  );
}

export default {
  category: PartCategory.Propulsion,
  vanillaData: vanillaStrutData,
  data: strutData,
  label: 'strut',

  Icon,
  LayoutComponent,
} as PartRegistryItem<Strut>;
