import { MutableRefObject } from 'react';
import { Group } from 'three';
import { UUID } from 'types/Parts';
import { Part, PartData, VanillaPart, VanillaPartData } from './Part';
import {
  usePartWithOrientation,
  VanillaPartWithOrientation,
  VanillaPartWithOrientationData,
} from './PartWithOrientation';
import {
  usePartWithScale,
  VanillaPartWithScale,
  VanillaPartWithScaleData,
} from './PartWithScale';
import {
  usePartWithTranslations,
  VanillaPartWithTranslations,
  VanillaPartWithTranslationsData,
} from './PartWithTranslations';

export interface VanillaPartWithTransformations
  extends VanillaPart,
    VanillaPartWithTranslations,
    // omit to fix o key conflict
    Omit<VanillaPartWithOrientation, 'o'>,
    Omit<VanillaPartWithScale, 'o'> {
  o: { x: number; y: number; z: number };
}

export interface PartWithTransformations
  extends Part,
    VanillaPartWithTransformations {}

export const VanillaPartWithTransformationsData: VanillaPartWithTransformations =
  {
    ...VanillaPartData,
    ...VanillaPartWithTranslationsData,
    ...VanillaPartWithOrientationData,
    ...VanillaPartWithScaleData,

    o: {
      ...VanillaPartWithScaleData.o,
      ...VanillaPartWithOrientationData.o,
    },
  };

export const PartWithTransformationsData: PartWithTransformations = {
  ...PartData,
  ...VanillaPartWithTransformationsData,

  label: 'Unlabeled Part With Transformations',
};

export const usePartWithTransformations = (
  ID: UUID,
  groupRef: MutableRefObject<Group>,
) => {
  usePartWithTranslations(ID, groupRef);
  usePartWithOrientation(ID, groupRef);
  usePartWithScale(ID, groupRef);
};
