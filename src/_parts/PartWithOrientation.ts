import Part, { ExportedPart, SavedPart } from './Part';

export interface ExportedPartWithOrientation extends ExportedPart {
  o: { z: number };
}
export interface SavedPartWithOrientation
  extends SavedPart,
    ExportedPartWithOrientation {}

abstract class PartWithOrientation extends Part<
  ExportedPartWithOrientation,
  SavedPartWithOrientation
> {
  o = { z: 0 };
}
export default PartWithOrientation;
