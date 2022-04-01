import Part, { SavedPart, VanillaPart } from './Part';

export interface VanillaPartWithTransformations extends VanillaPart {
  p: { x: number; y: number };
  o: { x: number; y: number; z: number };
}
export interface SavedPartWithTransformations
  extends SavedPart,
    VanillaPartWithTransformations {}

abstract class PartWithTransformations<
    VanillaState extends VanillaPartWithTransformations,
    SavedState extends SavedPartWithTransformations = VanillaState &
      SavedPartWithTransformations,
  >
  extends Part<VanillaState, SavedState>
  implements VanillaPartWithTransformations
{
  p = { x: 0, y: 0 };
  o = { x: 1, y: 1, z: 0 };

  readonly hasTransformations = true;
}
export default PartWithTransformations;
