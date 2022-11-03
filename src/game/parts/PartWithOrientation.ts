import { declareBoundNeedsUpdate, deferUpdates } from 'core/bounds';
import { getPart, PartRotateEventDetail } from 'core/part';
import usePartProperty from 'hooks/usePartProperty';
import { RefObject, useEffect } from 'react';
import { Object3D } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import { Part, PartData, VanillaPart, VanillaPartData } from './Part';

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
      object.current.rotateZ(event.detail);

      declareBoundNeedsUpdate(id);
      deferUpdates();
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
    (part: PartWithOrientation) => part.o,
    (o) => {
      object.current?.rotation.set(0, 0, degToRad(o.z));
      declareBoundNeedsUpdate(id);
      deferUpdates();
    },
  );
};

export const registry = null;
