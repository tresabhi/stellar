import Part, { VanillaPart, SavedPart } from './Part';

export interface VanillaPartWithTransformations extends VanillaPart {
  p: { x: number; y: number };
  o: { x: number; y: number; z: number };
}
export interface SavedPartWithTransformations
  extends SavedPart,
    VanillaPartWithTransformations {}

abstract class PartWithTransformations<
    Exported extends VanillaPartWithTransformations = VanillaPartWithTransformations,
    Saved extends SavedPartWithTransformations = SavedPartWithTransformations,
  >
  extends Part<Exported, Saved>
  implements VanillaPartWithTransformations
{
  p = { x: 0, y: 0 };
  o = { x: 1, y: 1, z: 0 };

  static hasTransformations = true;
}
export default PartWithTransformations;
