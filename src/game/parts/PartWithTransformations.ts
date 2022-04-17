import { Part, PartData, VanillaPart, VanillaPartData } from './Part';
import { VanillaPartWithOrientationData } from './PartWithOrientation';
import {
  VanillaPartWithScale,
  VanillaPartWithScaleData,
} from './PartWithScale';
import {
  VanillaPartWithTranslations,
  VanillaPartWithTranslationsData,
} from './PartWithTranslations';

export interface VanillaPartWithTransformations
  extends VanillaPart,
    VanillaPartWithTranslations,
    // omit to fix o key conflict
    Omit<VanillaPartWithTranslations, 'o'>,
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

    o: { x: 0, y: 0, z: 0 },
  };

export const PartWithTransformationsData: PartWithTransformations = {
  ...PartData,
  ...VanillaPartWithTransformationsData,

  label: 'Unlabeled Part With Transformations',
};
