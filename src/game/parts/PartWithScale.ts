import { declareBoundNeedsUpdate, deferUpdates } from 'core/bounds';
import { getPart, PartScaleEventDetail } from 'core/part';
import usePartProperty from 'hooks/usePartProperty';
import { RefObject, useEffect } from 'react';
import { Object3D, Vector3 } from 'three';
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
  const scale = new Vector3();

  const handlePartMove = (event: CustomEvent<PartScaleEventDetail>) => {
    if (object.current && getPart(id)?.selected) {
      object.current.scale.multiply(
        scale.set(event.detail.x, event.detail.y, 0),
      );

      declareBoundNeedsUpdate(id);
      deferUpdates();
    }
  };

  useEffect(() => {
    window.addEventListener('partscale', handlePartMove as EventListener);

    return () => {
      window.removeEventListener('partscale', handlePartMove as EventListener);
    };
  });

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
