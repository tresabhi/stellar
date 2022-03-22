export interface ExportedPartWithOrientation {
  o: { z: number };
}
export interface SavedPartWithOrientation extends ExportedPartWithOrientation {}

abstract class PartWithOrientation {
  o = { z: 0 };
}
export default PartWithOrientation;
