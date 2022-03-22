import { Mixin } from 'ts-mixer';
import PartWithOrientation, {
  SavedPartWithOrientation,
} from './PartWithOrientation';
import PartWithPosition, {
  ExportedPartWithPosition,
  SavedPartWithPosition,
} from './PartWithPosition';
import PartWithScale, { SavedPartWithScale } from './PartWithScale';
import PartWithTemperature, {
  ExportedPartWithTemperature,
  SavedPartWithTemperature,
} from './PartWithTemperature';

export interface ExportedPartPhysical
  extends ExportedPartWithPosition,
    ExportedPartWithTemperature {
  // conflict between ExportedPartWithOrientation and ExportedPartWithScale
  o: { x: number; y: number; z: number };
}
export interface SavedPartPhysical
  extends SavedPartWithPosition,
    SavedPartWithOrientation,
    SavedPartWithScale,
    SavedPartWithTemperature {}

abstract class PartPhysical extends Mixin(
  PartWithPosition,
  PartWithOrientation,
  PartWithScale,
  PartWithTemperature,
) {}
export default PartPhysical;
