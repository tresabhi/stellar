import { Part, VanillaPart } from './Part';

export interface VanillaPartWithTranslations extends VanillaPart {
  p: { x: number; y: number };
}

export interface PartWithTranslations
  extends Part,
    VanillaPartWithTranslations {}
