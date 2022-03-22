import Part, { ExportedPart, SavedPart } from './Part';

export interface ExportedPartWithScale extends ExportedPart {
  o: { x: number; y: number };
}
export interface SavedPartWithScale extends SavedPart, ExportedPartWithScale {}

abstract class PartWithScale extends Part<
  ExportedPartWithScale,
  SavedPartWithScale
> {
  o: { x: 0; y: 0 };
}
export default PartWithScale;
