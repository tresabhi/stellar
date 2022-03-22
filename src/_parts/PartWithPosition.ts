export interface ExportedPartWithPosition {
  p: { x: number; y: number };
}
export interface SavedPartWithPosition extends ExportedPartWithPosition {}

abstract class PartWithPosition {
  p = { x: 0, y: 0 };
}
export default PartWithPosition;
