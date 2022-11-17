import { useThree } from '@react-three/fiber';
import { declareBoundsUpdated } from 'core/bounds';
import { getPart, PartMoveEventDetail } from 'core/part';
import usePartProperty from 'hooks/usePartProperty';
import { RefObject, useEffect } from 'react';
import boundsStore from 'stores/bounds';
import { Object3D, Vector3 } from 'three';
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
  const invalidate = useThree((state) => state.invalidate);
  const movement = new Vector3();

  const handlePartMove = (event: CustomEvent<PartMoveEventDetail>) => {
    if (object.current && getPart(id)?.selected) {
      object.current.position.add(
        movement.set(event.detail.x, event.detail.y, 0),
      );
      invalidate();
    }
  };

  useEffect(() => {
    window.addEventListener('partmove', handlePartMove as EventListener);

    return () => {
      window.removeEventListener('partmove', handlePartMove as EventListener);
    };
  });

  usePartProperty(
    id,
    (part: PartWithPosition) => part.p,
    (p, prevP) => {
      object.current?.position.set(p.x, p.y, 0);
      invalidate();

      if (object.current) {
        const { bounds } = boundsStore[id];

        bounds.x += p.x - prevP.x;
        bounds.y += p.y - prevP.y;

        declareBoundsUpdated(id);
      }
    },
    { fireInitially: false },
  );
};

export const registry = null;
