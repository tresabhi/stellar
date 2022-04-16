import { Part, VanillaPart } from './Part';
import { PartWithOrientation } from './PartWithOrientation';
import { PartWithScale } from './PartWithScale';
import { PartWithTranslations } from './PartWithTranslations';

export interface VanillaPartWithTransformations
  extends VanillaPart,
    PartWithTranslations,
    // omit to fix o key conflict
    Omit<PartWithOrientation, 'o'>,
    Omit<PartWithScale, 'o'> {
  o: { x: number; y: number; z: number };
}

export interface PartWithTransformations
  extends Part,
    VanillaPartWithTransformations {}
