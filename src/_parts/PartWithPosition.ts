import { Vector2 } from 'three';
import Part from './Part';

abstract class PartWithPosition extends Part {
  position = new Vector2(0, 0);
}
export default PartWithPosition;
