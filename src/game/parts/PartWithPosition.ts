import { declareBoundNeedsUpdate, deferUpdates } from 'core/bounds';
import { getPart } from 'core/part';
import { PartMoveEventData } from 'hooks/useDragControls';
import usePartProperty from 'hooks/usePartProperty';
import { RefObject, useEffect } from 'react';
import { Object3D } from 'three';
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
  object: RefObject<Object3D>,
) => {
  const handlePartMove = (event: CustomEvent<PartMoveEventData>) => {
    if (object.current && getPart(id)?.selected) {
      object.current.position.x += event.detail.x;
      object.current.position.y += event.detail.y;

      declareBoundNeedsUpdate(id);
      deferUpdates();
    }
  };

  usePartProperty(
    id,
    (part: PartWithPosition) => part.p,
    (p) => {
      object.current?.position.set(p.x, p.y, 0);
      declareBoundNeedsUpdate(id);
      deferUpdates();
    },
  );

  useEffect(() => {
    window.addEventListener('partmove', handlePartMove as EventListener);

    return () => {
      window.removeEventListener('partmove', handlePartMove as EventListener);
    };
  });
};

export const registry = null;
