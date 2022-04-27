import usePartProperty from 'hooks/usePartProperty';
import { MutableRefObject } from 'react';
import { Group } from 'three';
import { UUID } from 'types/Parts';
import { Part, PartData, VanillaPart, VanillaPartData } from './Part';

export interface VanillaPartWithScale extends VanillaPart {
  o: { x: number; y: number };
}

export interface PartWithScale extends Part, VanillaPartWithScale {}

export const VanillaPartWithScaleData: VanillaPartWithScale = {
  ...VanillaPartData,

  o: { x: 1, y: 1 },
};

export const PartWithScaleData: PartWithScale = {
  ...PartData,
  ...VanillaPartWithScaleData,

  label: 'Unlabeled Part With Scale',
};

export const usePartWithScale = (
  ID: UUID,
  groupRef: MutableRefObject<Group>,
) => {
  usePartProperty(
    ID,
    (part: PartWithScale) => part.o,
    (o) => groupRef.current.scale.set(o.x, o.y, 1),
  );
};
