import Part, { ExportedPart, SavedPart } from './Part';

export interface ExportedPartWithTransformations extends ExportedPart {
  p: { x: number; y: number };
  o: { x: number; y: number; z: number };
}

abstract class PartWithTransformations<
    Exported extends ExportedPartWithTransformations = ExportedPartWithTransformations,
    Saved extends Exported & SavedPart = Exported & SavedPart,
  >
  extends Part<Exported, Saved>
  implements ExportedPartWithTransformations
{
  p = { x: 0, y: 0 };
  o = { x: 1, y: 1, z: 0 };

  static hasTransformations = true;
}
export default PartWithTransformations;
