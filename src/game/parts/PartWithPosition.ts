import { declareBoundNeedsUpdate, deferUpdates } from 'core/bounds';
import usePartProperty from 'hooks/usePartProperty';
import { MutableRefObject } from 'react';
import { Group, Mesh } from 'three';
import { Part, PartData, VanillaPart, VanillaPartData } from './Part';

export interface VanillaPartWithPosition extends VanillaPart {
  /**
   * Position of the part in `x` and `y` axis
   */
  p: { x: number; y: number };
}

export interface PartWithPosition extends Part, VanillaPartWithPosition {}

export const VanillaPartWithPositionData: VanillaPartWithPosition = {
  ...VanillaPartData,

  p: { x: 0, y: 0 },
};

export const PartWithPositionData: PartWithPosition = {
  ...PartData,
  ...VanillaPartWithPositionData,

  label: 'Unlabeled Part With Translations',
};

export const usePartWithPosition = (
  id: string,
  group: MutableRefObject<Mesh | Group>,
) => {
  usePartProperty(
    id,
    (part: PartWithPosition) => part.p,
    (p) => {
      group.current.position.set(p.x, p.y, 0);
      declareBoundNeedsUpdate(id);
      deferUpdates();
    },
  );
};
