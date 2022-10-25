import { declareBoundNeedsUpdate, deferUpdates } from 'core/bounds';
import usePartProperty from 'hooks/usePartProperty';
import { RefObject } from 'react';
import { Object3D } from 'three';
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

export const usePartWithScale = (id: string, object: RefObject<Object3D>) => {
  usePartProperty(
    id,
    (part: PartWithScale) => part.o,
    (o) => {
      object.current?.scale.set(o.x, o.y, (Math.abs(o.x) + Math.abs(o.y)) / 2);
      declareBoundNeedsUpdate(id);
      deferUpdates();
    },
  );
};

export const registry = null;
