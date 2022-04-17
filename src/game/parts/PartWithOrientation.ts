import usePartProperty from 'hooks/usePartProperty';
import { MutableRefObject } from 'react';
import { Group } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import { UUID } from 'types/Parts';
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
  ID: UUID,
  groupRef: MutableRefObject<Group>,
) => {
  usePartProperty(
    ID,
    (part: PartWithOrientation) => part.o,
    (o) => groupRef.current.rotation.set(0, 0, degToRad(o.z)),
  );
};
