import { Mixin } from 'ts-mixer';
import PartWithOrientation from './PartWithOrientation';
import PartWithPosition, {
  ExportedPartWithPosition,
  SavedPartWithPosition
} from './PartWithPosition';
import PartWithScale from './PartWithScale';
import PartWithTemperature, {
  ExportedPartWithTemperature,
  SavedPartWithTemperature
} from './PartWithTemperature';

export interface ExportedPartPhysical
  extends ExportedPartWithPosition,
    ExportedPartWithTemperature {
  // conflict between ExportedPartWithOrientation and ExportedPartWithScale
  o: { x: number; y: number; z: number };
}
export interface SavedPartPhysical
  extends ExportedPartPhysical,
    SavedPartWithPosition,
    SavedPartWithTemperature {
  // conflict between SavedPartWithOrientation and SavedPartWithScale
}

class PartPhysical extends Mixin(
  PartWithPosition,
  PartWithOrientation,
  PartWithScale,
  PartWithTemperature,
) {}
export default PartPhysical;
