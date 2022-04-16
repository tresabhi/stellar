import { Part, VanillaPart } from './Part';

export interface VanillaPartWithOrientation extends VanillaPart {
  o: { z: number };
}

export interface PartWithOrientation
  extends Part,
    VanillaPartWithOrientation {}
