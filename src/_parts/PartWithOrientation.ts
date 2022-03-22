import Part, { ExportedPart, SavedPart } from './Part';

export interface ExportedPartWithOrientation extends ExportedPart {
  o: { z: number };
}
export interface SavedPartWithOrientation extends SavedPart {
  orientation: number;
}

abstract class PartWithOrientation extends Part<
  ExportedPartWithOrientation,
  SavedPartWithOrientation
> {
  orientation = 0;
}
export default PartWithOrientation;
