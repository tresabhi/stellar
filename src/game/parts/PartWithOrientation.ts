import { invalidate } from '@react-three/fiber';
import { declareBoundsUpdated } from 'core/bounds';
import { getPart, PartRotateEventDetail } from 'core/part';
import usePartProperty from 'hooks/usePartProperty';
import { RefObject, useEffect } from 'react';
import boundsStore from 'stores/bounds';
import { Object3D } from 'three';
import {
  Part, PartData, VanillaPart, VanillaPartData,
} from './Part';

export interface VanillaPartWithOrientation extends VanillaPart {
  /**
   * Rotation of the part denoted by the `z` axis
   */
  o: { z: number };
}

export interface PartWithOrientation extends Part, VanillaPartWithOrientation {}

export const VanillaPartWithOrientationData: VanillaPartWithOrientation = {
  ...VanillaPartData,

  o: { z: 0 },
};

export const PartWithOrientationData: PartWithOrientation = {
  ...PartData,
  ...VanillaPartWithOrientationData,

  label: 'Unlabeled Part With Orientation',
};

export const usePartWithOrientation = (
  id: string,
  object: RefObject<Object3D>,
) => {
  const handlePartRotate = (event: CustomEvent<PartRotateEventDetail>) => {
    if (object.current && getPart(id)?.selected) {
      object.current.rotateZ((event.detail / 180) * Math.PI);
      invalidate();
    }
  };

  useEffect(() => {
    window.addEventListener('partrotate', handlePartRotate as EventListener);

    return () => {
      window.removeEventListener(
        'partrotate',
        handlePartRotate as EventListener,
      );
    };
  });

  usePartProperty(
    id,
    (part: PartWithOrientation) => part.o.z,
    (z, prevZ) => {
      object.current?.rotation.set(0, 0, (z / 180) * Math.PI);
      invalidate();

      if (object.current && boundsStore[id]) {
        const { bounds } = boundsStore[id];
        const deltaRotation = ((z - prevZ) / 180) * Math.PI;
        const offsetX = bounds.x - object.current.position.x;
        const offsetY = bounds.y - object.current.position.y;
        const offset = Math.hypot(offsetX, offsetY);
        const offsetAngle = Math.atan2(offsetY, offsetX);
        const newOffsetAngle = offsetAngle + deltaRotation;
        const newOffsetX = offset * Math.cos(newOffsetAngle);
        const newOffsetY = offset * Math.sin(newOffsetAngle);
        const x = object.current.position.x + newOffsetX;
        const y = object.current.position.y + newOffsetY;
        const rotation = bounds.rotation + deltaRotation;

        bounds.x = x;
        bounds.y = y;
        bounds.rotation = rotation;

        declareBoundsUpdated(id);
      }
    },
  );
};

export const registry = null;
