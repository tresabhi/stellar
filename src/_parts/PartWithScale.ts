export interface ExportedPartWithScale {
  o: { x: number; y: number };
}
export interface SavedPartWithScale extends ExportedPartWithScale {}

abstract class PartWithScale {
  o = { x: 0, y: 0 };
}
export default PartWithScale;
