import Part from './Part';

export interface PartWithTransformationsData {
  p: { x: number; y: number };
  o: { x: number; y: number; z: number };
}

abstract class PartWithTransformations<T extends {}>
  extends Part<T & PartWithTransformationsData>
  implements PartWithTransformationsData
{
  p = { x: 0, y: 0 };
  o = { x: 1, y: 1, z: 0 };
}
export default PartWithTransformations;
