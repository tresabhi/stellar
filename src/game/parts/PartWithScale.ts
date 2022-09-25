import { declareBoundNeedsUpdate, deferUpdates } from 'core/bounds';
import usePartProperty from 'hooks/usePartProperty';
import { RefObject } from 'react';
import { Group, Mesh } from 'three';
import { Part, PartData, VanillaPart, VanillaPartData } from './Part';

export interface VanillaPartWithScale extends VanillaPart {
  /**
   * Scale of the part on both `x` and `y` axis
   */
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
  id: string,
  groupRef: RefObject<Mesh | Group>,
) => {
  usePartProperty(
    id,
    (part: PartWithScale) => part.o,
    (o) => {
      groupRef.current?.scale.set(o.x, o.y, (o.x + o.y) / 2);
      declareBoundNeedsUpdate(id);
      deferUpdates();
    },
  );
};
