import { useThree } from '@react-three/fiber';
import { declareBoundsUpdated } from 'core/bounds';
import { getPart, PartScaleEventDetail } from 'core/part';
import usePartProperty from 'hooks/usePartProperty';
import { RefObject, useEffect } from 'react';
import boundsStore from 'stores/bounds';
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
  const invalidate = useThree((state) => state.invalidate);
  const scale = new Vector3();

  const handlePartMove = (event: CustomEvent<PartScaleEventDetail>) => {
    if (object.current && getPart(id)?.selected) {
      object.current.scale.multiply(
        scale.set(event.detail.x, event.detail.y, 0),
      );
      invalidate();
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
    (o, prevO) => {
      object.current?.scale.set(o.x, o.y, (Math.abs(o.x) + Math.abs(o.y)) / 2);
      invalidate();

      if (object.current) {
        const { bounds } = boundsStore[id];
        const scaleX = o.x / prevO.x;
        const scaleY = o.y / prevO.y;
        const offsetX = bounds.x - object.current.position.x;
        const offsetY = bounds.y - object.current.position.y;
        const newOffsetX = offsetX * scaleX;
        const newOffsetY = offsetY * scaleY;
        const x = object.current.position.x + newOffsetX;
        const y = object.current.position.y + newOffsetY;
        const width = bounds.width * scaleX;
        const height = bounds.height * scaleY;

        bounds.x = x;
        bounds.y = y;
        bounds.width = width;
        bounds.height = height;

        declareBoundsUpdated(id);
      }
    },
    { fireInitially: false },
  );
};

export const registry = null;
