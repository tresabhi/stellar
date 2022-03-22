import Part, { ExportedPart, SavedPart } from './Part';

export interface ExportedPartWithPosition extends ExportedPart {
  p: { x: number; y: number };
}
export interface SavedPartWithPosition
  extends SavedPart,
    ExportedPartWithPosition {}

abstract class PartWithPosition extends Part<
  ExportedPartWithPosition,
  SavedPartWithPosition
> {
  p: { x: 0; y: 0 };
}
export default PartWithPosition;
