import { Mixin } from 'ts-mixer';
import PartWithOrientation from './PartWithOrientation';
import PartWithPosition from './PartWithPosition';
import PartWithScale from './PartWithScale';
import PartWithTemperature from './PartWithTemperature';

abstract class PartPhysical extends Mixin(
  PartWithPosition,
  PartWithOrientation,
  PartWithScale,
  PartWithTemperature,
) {}
export default PartPhysical;
