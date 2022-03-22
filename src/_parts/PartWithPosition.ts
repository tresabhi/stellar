import { Vector2 } from 'three';
import Part, { ExportedPart, SavedPart } from './Part';

export interface ExportedPartWithPosition extends ExportedPart {
  p: { x: number; y: number };
}
export interface SavedPartWithPosition extends SavedPart {
  position: { x: number; y: number };
}

abstract class PartWithPosition extends Part<
  ExportedPartWithPosition,
  SavedPartWithPosition
> {
  position = new Vector2(0, 0);
}
export default PartWithPosition;
