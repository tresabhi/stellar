import { Vector2 } from 'three';
import Part, { ExportedPart, SavedPart } from './Part';

export interface ExportedPartWithScale extends ExportedPart {
  o: { x: number; y: number };
}
export interface SavedPartWithScale extends SavedPart {
  scale: { x: number; y: number };
}

abstract class PartWithScale extends Part<
  ExportedPartWithScale,
  SavedPartWithScale
> {
  scale = new Vector2(1, 1);
}
export default PartWithScale;
