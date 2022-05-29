import { computePartBound } from 'core/bounds';
import { requestComputeSelectionBound } from 'core/bounds/functions/requestComputeSelectionBound';
import usePartProperty from 'hooks/usePartProperty';
import { MutableRefObject } from 'react';
import { Group } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import { Part, PartData, VanillaPart, VanillaPartData } from './Part';

export interface VanillaPartWithOrientation extends VanillaPart {
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
  groupRef: MutableRefObject<Group>,
) => {
  usePartProperty(
    id,
    (part: PartWithOrientation) => part.o,
    (o) => {
      groupRef.current.rotation.set(0, 0, degToRad(o.z));
      computePartBound(id, groupRef);
      requestComputeSelectionBound();
    },
  );
};
