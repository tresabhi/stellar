import { Part, VanillaPart } from './Part';

export interface VanillaPartWithScale extends VanillaPart {
  o: { x: number; y: number };
}

export interface PartWithScale extends Part, VanillaPartWithScale {}
