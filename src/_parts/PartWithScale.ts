import { Vector2 } from 'three';
import Part from './Part';

abstract class PartWithScale extends Part {
  scale = new Vector2(1, 1);
}
export default PartWithScale;
